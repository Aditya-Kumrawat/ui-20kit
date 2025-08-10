import { RequestHandler } from "express";

// Vapi proxy route to bypass client-side network restrictions
export const handleVapiProxy: RequestHandler = async (req, res) => {
  try {
    console.log('🚀 Server-side Vapi proxy request:', {
      method: req.method,
      path: req.path,
      body: req.body
    });

    const apiKey = process.env.VITE_VAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Vapi API key not configured on server' 
      });
    }

    // Extract the Vapi endpoint from the request
    const vapiEndpoint = req.params.endpoint || req.query.endpoint;
    const vapiUrl = `https://api.vapi.ai/${vapiEndpoint}`;

    console.log('📡 Proxying to Vapi URL:', vapiUrl);

    // Make the request to Vapi API from server-side
    const vapiResponse = await fetch(vapiUrl, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vapi-Proxy-Server/1.0'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    console.log('✅ Vapi response status:', vapiResponse.status);

    const responseData = await vapiResponse.json();
    
    // Forward the response back to client
    res.status(vapiResponse.status).json(responseData);

  } catch (error: any) {
    console.error('❌ Vapi proxy error:', error);
    res.status(500).json({ 
      error: 'Vapi proxy failed', 
      details: error.message 
    });
  }
};

// Specific handler for Vapi call creation
export const handleVapiCall: RequestHandler = async (req, res) => {
  try {
    console.log('📞 Creating Vapi call via server proxy');
    
    const apiKey = process.env.VITE_VAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Vapi API key not configured on server' 
      });
    }

    // Create call configuration
    const callConfig = req.body;
    console.log('🔧 Call config:', JSON.stringify(callConfig, null, 2));

    // Make the call creation request to Vapi API
    const vapiResponse = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Vapi-Proxy-Server/1.0'
      },
      body: JSON.stringify(callConfig)
    });

    console.log('📞 Vapi call response status:', vapiResponse.status);

    if (!vapiResponse.ok) {
      const errorData = await vapiResponse.text();
      console.error('❌ Vapi call failed:', errorData);
      return res.status(vapiResponse.status).json({ 
        error: 'Vapi call creation failed', 
        details: errorData 
      });
    }

    const callData = await vapiResponse.json();
    console.log('✅ Vapi call created successfully:', callData.id);
    
    res.json(callData);

  } catch (error: any) {
    console.error('❌ Vapi call creation error:', error);
    res.status(500).json({ 
      error: 'Vapi call creation failed', 
      details: error.message 
    });
  }
};

// Test Vapi connectivity from server-side
export const handleVapiTest: RequestHandler = async (req, res) => {
  try {
    console.log('🧪 Testing Vapi connectivity from server...');
    
    const apiKey = process.env.VITE_VAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Vapi API key not configured on server',
        configured: false
      });
    }

    // Test API key validity
    const testResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const success = testResponse.ok || testResponse.status === 404;
    
    res.json({
      success,
      status: testResponse.status,
      message: success 
        ? 'Vapi API connectivity successful from server' 
        : 'Vapi API connectivity failed from server',
      configured: true,
      apiKeyLength: apiKey.length
    });

  } catch (error: any) {
    console.error('❌ Server-side Vapi test failed:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server-side Vapi test failed', 
      details: error.message,
      configured: false
    });
  }
};
