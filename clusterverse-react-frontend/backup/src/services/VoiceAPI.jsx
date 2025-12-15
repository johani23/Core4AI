import axios from "axios";

// ðŸŒ Environment Variables
const ELEVEN_API_KEY = import.meta.env.VITE_ELEVEN_API_KEY;
const SAUDI_FEMALE_VOICE = import.meta.env.VITE_ELEVEN_VOICE_ID; // e.g. Aisha / Reem clone

/**
 * ðŸ’¬ generateVoice()
 * Hybrid Arabic-English voice with dynamic tone & Gen-Z vibe
 */
export async function generateVoice(text) {
  try {
    console.log("ðŸŽ§ Core4 Voice â†’ generating hybrid accent for:", text);

    // ðŸ§  Detect language composition
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const isEnglish = /[A-Za-z]/.test(text);

    // ðŸŽ¯ Force a single female Saudi-accent voice for all text
    const voiceId = SAUDI_FEMALE_VOICE;
    const modelId = "eleven_multilingual_v2";

    // ðŸŽ›ï¸ Tone / style blending logic
    let style = 0.6;
    if (text.match(/(ðŸ”¥|Ø¬Ù…ÙŠÙ„|awesome|ðŸ˜|wow|Ø­Ù„Ùˆ)/i)) style = 0.9; // high-energy
    if (text.match(/(Ø­Ø²ÙŠÙ†|ðŸ’”|sad|lonely|tired)/i)) style = 0.3;   // soft & slow
    if (text.match(/(ØªÙÙƒÙŠØ±|ðŸ¤”|idea|hmm)/i)) style = 0.5;          // reflective

    // ðŸ—£ï¸ Optional dynamic punctuation to help accent blending
    let processedText = text;
    if (isArabic && isEnglish)
      processedText = text.replace(/([A-Za-z]+)/g, " $1 "); // adds micro-pauses
    if (isEnglish && !isArabic)
      processedText = "Ø£Ø³Ù…Ø¹ÙŠ! " + text + " ØªÙ…Ø§Ù…ØŸ"; // adds Arabic rhythm inflection

    console.log(`ðŸŒ Detected â†’ Arabic: ${isArabic} | English: ${isEnglish} | Style: ${style}`);

    // ðŸŽ§ Request from ElevenLabs
    const response = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      data: {
        text: processedText,
        model_id: modelId,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.9,
          style,
        },
      },
    });

    // ðŸŽµ Return usable blob URL
    const audioUrl = URL.createObjectURL(new Blob([response.data]));
    console.log("âœ… Voice generated successfully (hybrid tone).");
    return audioUrl;
  } catch (error) {
    console.error("âŒ Voice generation failed:", error.response?.status, error.message);
    return null;
  }
}

/**
 * ðŸ§ª TestVoiceButton â€“ verify hybrid female voice
 */
export function TestVoiceButton() {
  const handleTest = async () => {
    const sample =
      "Hey! Ø­ÙŠØ§Ùƒ ÙÙŠ Core4.AI â€” this voice blends Arabic warmth and Gen-Z energy!";
    const url = await generateVoice(sample);
    if (url) new Audio(url).play();
  };

  return (
    <div className="p-4 bg-[#111827] text-white rounded-2xl shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        ðŸŽ§ Test AI Voice
      </h3>
      <p className="text-sm text-gray-400 mb-3">
        Click below to test the Core4.AI hybrid Saudi female voice.
      </p>
      <button
        onClick={handleTest}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-all"
      >
        ðŸ”Š Test Voice
      </button>
    </div>
  );
}
