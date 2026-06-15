/**
 * WORM AI - API Client Utilities
 * Centralized API communication for frontend
 */

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface ChatRequest {
  contents: ChatMessage[];
}

interface ChatResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: string;
  message?: string;
}

/**
 * Send chat message to Gemini API via backend
 * @param messages - Chat conversation history
 * @returns AI response text
 */
export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        contents: messages,
      } as ChatRequest),
    });

    let data: ChatResponse | null = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      const errMsg =
        data && (data.error || data.message)
          ? data.error || data.message
          : `HTTP ${response.status}`;
      throw new Error(errMsg);
    }

    // Extract AI response
    if (data && data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response format from API');
  } catch (error) {
    const message =
      error && (error as any).message
        ? (error as any).message
        : 'Network error occurred';
    throw new Error(message);
  }
}

/**
 * Test API connectivity
 * @returns Success status and message
 */
export async function testChatAPI(
  testMessage: string = 'Hello, test message'
): Promise<{ success: boolean; message: string }> {
  try {
    const testMessages: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: testMessage }],
      },
    ];

    const response = await sendChatMessage(testMessages);

    return {
      success: true,
      message: `API responded: ${response.substring(0, 100)}...`,
    };
  } catch (error) {
    return {
      success: false,
      message: `API test failed: ${(error as any).message}`,
    };
  }
}

/**
 * Fetch session status
 */
export async function getSessionStatus(): Promise<{
  authenticated: boolean;
}> {
  try {
    const response = await fetch('/api/session', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return await response.json();
    }

    return { authenticated: false };
  } catch (error) {
    return { authenticated: false };
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<boolean> {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}
