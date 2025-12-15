import axios from "axios";

// Ã°Å¸Å’Â Environment Variables
const ELEVEN_API_KEY = import.meta.env.VITE_ELEVEN_API_KEY;
const SAUDI_FEMALE_VOICE = import.meta.env.VITE_ELEVEN_VOICE_ID; // e.g. Aisha / Reem clone

/**
 * Ã°Å¸â€™Â¬ generateVoice()
 * Hybrid Arabic-English voice with dynamic tone & Gen-Z vibe
 */
export async function generateVoice(text) {
  try {
    console.log("Ã°Å¸Å½Â§ Core4 Voice Ã¢â€ â€™ generating hybrid accent for:", text);

    // Ã°Å¸Â§Â  Detect language composition
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const isEnglish = /[A-Za-z]/.test(text);

    // Ã°Å¸Å½Â¯ Force a single female Saudi-accent voice for all text
    const voiceId = SAUDI_FEMALE_VOICE;
    const modelId = "eleven_multilingual_v2";

    // Ã°Å¸Å½â€ºÃ¯Â¸Â Tone / style blending logic
    let style = 0.6;
    if (text.match(/(Ã°Å¸â€Â¥|Ã˜Â¬Ã™â€¦Ã™Å Ã™â€ž|awesome|Ã°Å¸ËœÂ|wow|Ã˜Â­Ã™â€žÃ™Ë†)/i)) style = 0.9; // high-energy
    if (text.match(/(Ã˜Â­Ã˜Â²Ã™Å Ã™â€ |Ã°Å¸â€™â€|sad|lonely|tired)/i)) style = 0.3;   // soft & slow
    if (text.match(/(Ã˜ÂªÃ™ÂÃ™Æ’Ã™Å Ã˜Â±|Ã°Å¸Â¤â€|idea|hmm)/i)) style = 0.5;          // reflective

    // Ã°Å¸â€”Â£Ã¯Â¸Â Optional dynamic punctuation to help accent blending
    let processedText = text;
    if (isArabic && isEnglish)
      processedText = text.replace(/([A-Za-z]+)/g, " $1 "); // adds micro-pauses
    if (isEnglish && !isArabic)
      processedText = "Ã˜Â£Ã˜Â³Ã™â€¦Ã˜Â¹Ã™Å ! " + text + " Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã˜Å¸"; // adds Arabic rhythm inflection

    console.log(`Ã°Å¸Å’Â Detected Ã¢â€ â€™ Arabic: ${isArabic} | English: ${isEnglish} | Style: ${style}`);

    // Ã°Å¸Å½Â§ Request from ElevenLabs
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

    // Ã°Å¸Å½Âµ Return usable blob URL
    const audioUrl = URL.createObjectURL(new Blob([response.data]));
    console.log("Ã¢Å“â€¦ Voice generated successfully (hybrid tone).");
    return audioUrl;
  } catch (error) {
    console.error("Ã¢ÂÅ’ Voice generation failed:", error.response?.status, error.message);
    return null;
  }
}

/**
 * Ã°Å¸Â§Âª TestVoiceButton Ã¢â‚¬â€œ verify hybrid female voice
 */
export function TestVoiceButton() {
  const handleTest = async () => {
    const sample =
      "Hey! Ã˜Â­Ã™Å Ã˜Â§Ã™Æ’ Ã™ÂÃ™Å  Core4.AI Ã¢â‚¬â€ this voice blends Arabic warmth and Gen-Z energy!";
    const url = await generateVoice(sample);
    if (url) new Audio(url).play();
  };

  return (
    <div className="p-4 bg-[#111827] text-white rounded-2xl shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        Ã°Å¸Å½Â§ Test AI Voice
      </h3>
      <p className="text-sm text-gray-400 mb-3">
        Click below to test the Core4.AI hybrid Saudi female voice.
      </p>
      <button
        onClick={handleTest}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-all"
      >
        Ã°Å¸â€Å  Test Voice
      </button>
    </div>
  );
}

