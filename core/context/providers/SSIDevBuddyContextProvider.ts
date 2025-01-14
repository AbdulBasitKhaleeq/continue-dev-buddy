import { TRIAL_PROXY_URL } from "../../control-plane/client.js";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
} from "../../index.js";
import { BaseContextProvider } from "../index.js";

class SSIDevBuddyContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "ssi-dev-buddy-context",
    displayTitle: "SSI Dev Buddy Context",
    description: "Retrieve a context item from SSI Dev Buddy",
    type: "normal",
    renderInlineAs: "",
  };

  override get description(): ContextProviderDescription {
    return {
      title: this.options.title || "ssi-dev-buddy-context",
      displayTitle: this.options.displayTitle || "SSI Dev Buddy Context",
      description:
        this.options.description ||
        "Retrieve a context item from SSI Dev Buddy",
      type: "normal",
    };
  }

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    const body = {
      query: query || "",
      fullInput: extras.fullInput,
      options: this.options.options,
    };
    
    const response = await extras.fetch(new URL("/api/vscode/context_api", TRIAL_PROXY_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.options.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    try {
      const createContextItem = (item: any) => ({
        description: item.description ?? "SSI Dev Buddy Context Item",
        content: item.content ?? "",
        name: item.name ?? this.options.title ?? "SSI Dev Buddy Context",
      });

      return Array.isArray(json)
        ? json.map(createContextItem)
        : [createContextItem(json)];
    } catch (e) {
      console.warn(
        `Failed to parse response from SSI Dev Buddy context provider.\nError:\n${e}\nResponse from server:\n`,
        json,
      );
      return [];
    }
  }
}

export default SSIDevBuddyContextProvider;
