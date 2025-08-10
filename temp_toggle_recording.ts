const toggleRecording = async () => {
    try {
      if (isRecording) {
        addDebugLog("Stopping Vapi recording...");
        if (vapi) {
          await vapi.stop();
        }
        setIsRecording(false);
        setVapiStatus("stopped");
        videoRef.current?.pause();
        addDebugLog("✅ Vapi stopped successfully");
      } else {
        addDebugLog("Starting Vapi recording...");
        setVapiError(null);
        setVapiStatus("starting");

        // Check if Vapi SDK is available
        if (!vapi) {
          throw new Error("Vapi SDK not initialized. Please check your API key configuration.");
        }

        // Check microphone permissions first
        try {
          addDebugLog("Requesting microphone permissions...");
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          stream.getTracks().forEach((track) => track.stop()); // Clean up
          addDebugLog("✅ Microphone permissions granted");
        } catch (permError: any) {
          throw new Error(`Microphone permission denied: ${permError.message}`);
        }

        // Configure the assistant for the call
        const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
        const voiceId = import.meta.env.VITE_VAPI_VOICE_ID || "rachel";

        let callConfig;

        if (assistantId) {
          // Use pre-created assistant
          addDebugLog(`Using pre-created assistant: ${assistantId}`);
          callConfig = assistantId; // For Web SDK, just pass the assistant ID
        } else {
          // Create assistant configuration dynamically
          addDebugLog("Creating dynamic assistant configuration");
          callConfig = {
            model: {
              provider: "openai",
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful AI assistant specializing in DNA analysis, genetic research, and data interpretation. Keep your responses concise and informative. You can help with genetic analysis, data visualization, research reports, and explaining genetic variants.",
                },
              ],
            },
            voice: {
              provider: "11labs",
              voiceId: voiceId,
            },
            firstMessage:
              "Hello! I'm your AI assistant. I can help you with DNA analysis and genetic research. How can I assist you today?",
          };
        }

        // Start the Vapi call directly using Web SDK
        addDebugLog("Starting Vapi Web SDK call...");
        await vapi.start(callConfig);
        addDebugLog("✅ Vapi call started successfully");

        setIsRecording(true);
        setVapiStatus("recording");
        videoRef.current?.play();
        addDebugLog("🎉 Vapi Web SDK call started successfully!");
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";

      // Enhanced error categorization
      let userFriendlyMessage = errorMessage;
      if (errorMessage.includes("Failed to fetch")) {
        userFriendlyMessage =
          "Network connection failed. Please check your internet connection and try again.";
      } else if (errorMessage.includes("Microphone permission")) {
        userFriendlyMessage =
          "Microphone access required. Please allow microphone permissions and try again.";
      } else if (errorMessage.includes("Invalid API key")) {
        userFriendlyMessage =
          "Invalid API key. Please check your Vapi configuration.";
      }

      addDebugLog(`❌ Vapi error: ${errorMessage}`);
      setVapiError(userFriendlyMessage);
      setVapiStatus("error");
      setIsRecording(false);
      console.error("Vapi error:", error);
    }
  };
