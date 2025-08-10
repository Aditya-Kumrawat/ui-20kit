import { RequestHandler } from "express";

// Vapi proxy route to bypass client-side network restrictions
export const handleVapiProxy: RequestHandler = async (req, res) => {
  try {
    console.log("🚀 Server-side Vapi proxy request:", {
      method: req.method,
      path: req.path,
      body: req.body,
    });

    const apiKey = process.env.VAPI_KEY || process.env.VITE_VAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Vapi API key not configured on server",
      });
    }

    // Extract the Vapi endpoint from the request
    const vapiEndpoint = req.params.endpoint || req.query.endpoint;
    const vapiUrl = `https://api.vapi.ai/${vapiEndpoint}`;

    console.log("📡 Proxying to Vapi URL:", vapiUrl);

    // Make the request to Vapi API from server-side
    const vapiResponse = await fetch(vapiUrl, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Vapi-Proxy-Server/1.0",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    console.log("✅ Vapi response status:", vapiResponse.status);

    // Read response once and handle both JSON and text cases
    const responseText = await vapiResponse.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error(
        "❌ Vapi response not valid JSON:",
        vapiResponse.status,
        responseText,
      );
      return res.status(vapiResponse.status).json({
        error: "Invalid response format from Vapi API",
        details: responseText,
        status: vapiResponse.status,
      });
    }

    // Forward the response back to client
    res.status(vapiResponse.status).json(responseData);
  } catch (error: any) {
    console.error("❌ Vapi proxy error:", error);
    res.status(500).json({
      error: "Vapi proxy failed",
      details: error.message,
    });
  }
};

// Specific handler for Vapi call creation
export const handleVapiCall: RequestHandler = async (req, res) => {
  try {
    console.log("📞 Creating Vapi call via server proxy");

    const apiKey = process.env.VAPI_KEY || process.env.VITE_VAPI_KEY;
    if (!apiKey) {
      console.error("❌ No API key configured for call creation");
      return res.status(500).json({
        error: "Vapi API key not configured on server",
      });
    }

    // Create call configuration
    const callConfig = req.body;
    console.log(
      "🔧 Call config received:",
      JSON.stringify(callConfig, null, 2),
    );

    // Make the call creation request to Vapi API
    console.log("📡 Making call request to Vapi API...");
    const vapiResponse = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Vapi-Proxy-Server/1.0",
      },
      body: JSON.stringify(callConfig),
    });

    console.log("📞 Vapi call response status:", vapiResponse.status);

    // Read response once and handle both JSON and text cases
    const responseText = await vapiResponse.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error(
        "❌ Vapi response not valid JSON:",
        vapiResponse.status,
        responseText,
      );
      return res.status(vapiResponse.status).json({
        error: "Vapi call creation failed",
        details: responseText,
        status: vapiResponse.status,
      });
    }

    if (!vapiResponse.ok) {
      console.error("❌ Vapi call failed:", vapiResponse.status, responseData);
      return res.status(vapiResponse.status).json({
        error: "Vapi call creation failed",
        details: responseData,
        status: vapiResponse.status,
      });
    }

    const callData = responseData;
    console.log("✅ Vapi call created successfully!");
    console.log("📋 Call details:", {
      id: callData.id,
      status: callData.status,
      type: callData.type,
    });

    // Return success response
    res.json({
      success: true,
      call: callData,
      message: "Vapi call created via server proxy",
    });
  } catch (error: any) {
    console.error("❌ Vapi call creation error:", error);
    res.status(500).json({
      error: "Vapi call creation failed",
      details: error.message,
      stack: error.stack?.substring(0, 200),
    });
  }
};

// Test Vapi connectivity from server-side
export const handleVapiTest: RequestHandler = async (req, res) => {
  try {
    console.log("🧪 Testing Vapi connectivity from server...");

    // Check environment variables
    const apiKey = process.env.VAPI_KEY || process.env.VITE_VAPI_KEY;
    console.log("🔍 Environment check:");
    console.log("  - VAPI_KEY exists:", !!process.env.VAPI_KEY);
    console.log("  - VITE_VAPI_KEY exists:", !!process.env.VITE_VAPI_KEY);
    console.log("  - Final API key length:", apiKey?.length || 0);

    if (!apiKey) {
      console.error("❌ No API key found in environment variables");
      return res.status(500).json({
        error: "Vapi API key not configured on server",
        configured: false,
        debug: {
          vapiKeyExists: !!process.env.VAPI_KEY,
          viteVapiKeyExists: !!process.env.VITE_VAPI_KEY,
        },
      });
    }

    console.log(`🔑 Using API key: ${apiKey.substring(0, 8)}...`);

    // Test API key validity
    console.log("📡 Making request to Vapi API...");
    const testResponse = await fetch("https://api.vapi.ai/assistant", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log(
      `📊 Vapi response: ${testResponse.status} ${testResponse.statusText}`,
    );

    const success = testResponse.ok || testResponse.status === 404;

    // Get response body for debugging
    let responseBody = "";
    try {
      // Clone the response to avoid consuming the body stream
      const clonedResponse = testResponse.clone();
      const text = await clonedResponse.text();
      responseBody = text.substring(0, 200); // First 200 chars
      console.log("📄 Response body preview:", responseBody);
    } catch (e) {
      console.log("📄 Could not read response body");
    }

    const result = {
      success,
      status: testResponse.status,
      message: success
        ? "Vapi API connectivity successful from server"
        : "Vapi API connectivity failed from server",
      configured: true,
      apiKeyLength: apiKey.length,
      responsePreview: responseBody.substring(0, 50),
    };

    console.log("✅ Test result:", result);
    res.json(result);
  } catch (error: any) {
    console.error("❌ Server-side Vapi test failed:", error);
    res.status(500).json({
      success: false,
      error: "Server-side Vapi test failed",
      details: error.message,
      stack: error.stack?.substring(0, 500),
      configured: false,
    });
  }
};
