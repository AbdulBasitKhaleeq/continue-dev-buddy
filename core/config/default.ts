import {
  ContextProviderWithParams,
  ModelDescription,
  SerializedContinueConfig,
  SlashCommandDescription,
} from "../";

export const DEFAULT_CHAT_MODEL_CONFIG: ModelDescription = {
  model: "claude-3-5-sonnet-latest",
  provider: "ssi-dev-buddy",
  apiKey: "",
  title: "Claude (ssi-devBuddy)",
};

export const DEFAULT_AUTOCOMPLETE_MODEL_CONFIG: ModelDescription = {
  title: "Codestral",
  provider: "mistral",
  model: "codestral-latest",
  apiKey: "",
};

export const FREE_TRIAL_MODELS: ModelDescription[] = [
  {
    title: "Claude (ssi-devBuddy)",
    provider: "ssi-dev-buddy",
    model: "claude-3-5-sonnet-latest",
    systemMessage:
      "You are an expert software developer. You give helpful and concise responses.",
  }
];

export const defaultContextProvidersVsCode: ContextProviderWithParams[] = [
  { name: "code", params: {} },
  { name: "docs", params: {} },
  { name: "diff", params: {} },
  { name: "terminal", params: {} },
  { name: "problems", params: {} },
  { name: "folder", params: {} },
  { name: "codebase", params: {} },
];

export const defaultContextProvidersJetBrains: ContextProviderWithParams[] = [
  { name: "diff", params: {} },
  { name: "folder", params: {} },
  { name: "codebase", params: {} },
];

export const defaultSlashCommandsVscode: SlashCommandDescription[] = [
  {
    name: "share",
    description: "Export the current chat session to markdown",
  },
  {
    name: "cmd",
    description: "Generate a shell command",
  },
  {
    name: "commit",
    description: "Generate a git commit message",
  },
];

export const defaultSlashCommandsJetBrains = [
  {
    name: "share",
    description: "Export the current chat session to markdown",
  },
  {
    name: "commit",
    description: "Generate a git commit message",
  },
];

export const defaultConfig: SerializedContinueConfig = {
  models: [DEFAULT_CHAT_MODEL_CONFIG],
  tabAutocompleteModel: DEFAULT_AUTOCOMPLETE_MODEL_CONFIG,
  contextProviders: defaultContextProvidersVsCode,
  slashCommands: defaultSlashCommandsVscode,
};

export const defaultConfigJetBrains: SerializedContinueConfig = {
  models: [DEFAULT_CHAT_MODEL_CONFIG],
  tabAutocompleteModel: DEFAULT_AUTOCOMPLETE_MODEL_CONFIG,
  contextProviders: defaultContextProvidersJetBrains,
  slashCommands: defaultSlashCommandsJetBrains,
};
