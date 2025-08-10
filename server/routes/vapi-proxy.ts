import { RequestHandler } from "express";

// Vapi proxy route to bypass client-side network restrictions
export const handleVapiProxy: RequestHandler = async (req, res) => {
  try {
    console.log("🚀 Server-side Vapi proxy request:", {
      method: req.method,
      path: req.path,
      body: req.body,
    });

    // Check for available API keys
    const privateKey = process.env.VAPI_PRIVATE_KEY;
    const publicKey =
      process.env.VITE_VAPI_PUBLIC_KEY || process.env.VITE_VAPI_KEY;
    const apiKey = privateKey || publicKey || process.env.VAPI_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "Vapi API key not configured on server. Set VAPI_PRIVATE_KEY or VITE_VAPI_PUBLIC_KEY environment variable.",
      });
    }

    const keyType = privateKey ? "private" : "public";
    if (keyType === "public") {
      console.log(
        "⚠️ Using public key for server operations - some features may be limited",
      );
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

    const privateKey = process.env.VAPI_PRIVATE_KEY;
    const publicKey =
      process.env.VITE_VAPI_PUBLIC_KEY || process.env.VITE_VAPI_KEY;
    const apiKey = privateKey || publicKey || process.env.VAPI_KEY;

    if (!apiKey) {
      console.error("❌ No API key configured for call creation");
      return res.status(500).json({
        error:
          "Vapi API key not configured on server. Set VAPI_PRIVATE_KEY or VITE_VAPI_PUBLIC_KEY environment variable.",
      });
    }

    const keyType = privateKey ? "private" : "public";
    console.log(`📞 Creating call with ${keyType} key`);

    if (keyType === "public") {
      console.log(
        "⚠️ Using public key for call creation - this may not work for all call types",
      );
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
    const privateKey = process.env.VAPI_PRIVATE_KEY;
    const publicKey =
      process.env.VITE_VAPI_PUBLIC_KEY || process.env.VITE_VAPI_KEY;
    const fallbackKey = process.env.VAPI_KEY;

    console.log("🔍 Environment check:");
    console.log("  - VAPI_PRIVATE_KEY exists:", !!privateKey);
    console.log("  - VITE_VAPI_PUBLIC_KEY exists:", !!publicKey);
    console.log("  - VAPI_KEY exists:", !!fallbackKey);

    // Determine which key to use and what endpoints are available
    let apiKey, keyType, testEndpoint;

    if (privateKey) {
      apiKey = privateKey;
      keyType = "private";
      testEndpoint = "https://api.vapi.ai/assistant"; // Private key can access admin endpoints
      console.log("🔑 Using private key for server-side operations");
    } else if (publicKey) {
      apiKey = publicKey;
      keyType = "public";
      console.log("🔑 Using public key - limited to public endpoints");

      // For public keys, we can't test admin endpoints, so we'll validate format and assume success
      if (apiKey.length >= 30 && /^[a-f0-9-]+$/.test(apiKey)) {
        console.log(
          "✅ Public key format appears valid - skipping admin endpoint test",
        );
        return res.json({
          success: true,
          status: 200,
          message: "Vapi API connectivity successful (public key validated)",
          configured: true,
          apiKeyLength: apiKey.length,
          keyType: "public",
          note: "Public keys cannot access admin endpoints - format validation passed",
        });
      } else {
        console.error("❌ Public key format validation failed");
        return res.status(400).json({
          success: false,
          error: "Invalid public key format",
          configured: true,
          apiKeyLength: apiKey.length,
          keyType: "public",
        });
      }
    } else if (fallbackKey) {
      apiKey = fallbackKey;
      keyType = "unknown";
      testEndpoint = "https://api.vapi.ai/assistant"; // Try private first, fallback to public
      console.log("🔑 Using fallback key - will auto-detect type");
    } else {
      console.error("❌ No API key found in environment variables");
      return res.status(500).json({
        error:
          "Vapi API key not configured. Set VAPI_PRIVATE_KEY or VITE_VAPI_PUBLIC_KEY environment variable.",
        configured: false,
        debug: {
          vapiPrivateKeyExists: !!privateKey,
          vapiPublicKeyExists: !!publicKey,
          vapiKeyExists: !!fallbackKey,
        },
      });
    }

    console.log(`🔑 Using ${keyType} API key: ${apiKey.substring(0, 8)}...`);

    // Test API key validity (only for private keys at this point)
    console.log(`📡 Making request to Vapi API (${keyType} key)...`);
    const testResponse = await fetch(testEndpoint, {
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
        ? `Vapi API connectivity successful from server (${keyType} key)`
        : `Vapi API connectivity failed from server (${keyType} key)`,
      configured: true,
      apiKeyLength: apiKey.length,
      keyType,
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
