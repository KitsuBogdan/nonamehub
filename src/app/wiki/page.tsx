import type { ReactNode } from "react";

export const metadata = {
  title: "Noname UI Wiki — NoNameHub",
  description:
    "Reference documentation for Noname UI v1.16.0: installation, public API, elements, themes, configuration, lazy loading, watermark, and troubleshooting.",
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick start" },
  { id: "project-structure", label: "Project structure" },
  { id: "lazy-loading", label: "Lazy loading" },
  { id: "public-api", label: "Public API" },
  { id: "elements", label: "Element reference" },
  { id: "notifications", label: "Notifications & dialogs" },
  { id: "watermark", label: "Watermark & KeybindList" },
  { id: "themes", label: "Themes" },
  { id: "configuration", label: "Configuration & flags" },
  { id: "device", label: "Device & mobile" },
  { id: "advanced", label: "Advanced utilities" },
  { id: "migration", label: "Migration v1.15 → v1.16" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "changelog", label: "Changelog" },
];

const elements = [
  {
    name: "AddLabel",
    signature: "tab:AddLabel(text, opts)",
    purpose:
      "Text/display row with optional icon, subtitle, rich text, alignment, accent, typewriter effect, pulse, click handler, and tooltip.",
    options:
      "Color, Bg, Icon, IconColor, Subtitle, SubtitleColor, Bold, RichText, Accent, Align, TextSize, Typewriter, TypeSpeed, Pulse, Clickable, Description",
    returns:
      "Set, SetColor, SetIcon, SetSubtitle, SetBold, SetAlign, SetVisible, Get, GetInstance, StopTypewriter, Reset",
    example:
      'local label = tab:AddLabel("Hello", { Icon = "info", Subtitle = "Status", Accent = true })\nlabel:Set("Ready")',
  },
  {
    name: "AddButton",
    signature: "tab:AddButton(text, callback, opts)",
    purpose:
      "Clickable action button with press-feedback animation. Optional Description provides a tooltip.",
    options: "Description",
    returns: "SetEnabled, Disable, Enable, IsEnabled, Reset",
    example:
      'local button = tab:AddButton("Run", function() print("clicked") end)\nbutton:Disable("Unavailable")\nbutton:Enable()\nprint(button:IsEnabled())',
  },
  {
    name: "AddButtonRow",
    signature: "tab:AddButtonRow(buttons, opts)",
    purpose:
      "Displays several related actions in one row. Each item supplies Text and Callback; Danger marks a destructive action.",
    options: "Per-button: Text, Callback, Danger",
    returns: "Reset; standard wrapper methods (MoveUp, MoveDown, SetOrder…)",
    example:
      'tab:AddButtonRow({\n  { Text = "Save", Callback = function() end },\n  { Text = "Load", Callback = function() end },\n  { Text = "Reset", Callback = function() end, Danger = true },\n})',
  },
  {
    name: "AddToggle",
    signature: "tab:AddToggle(text, callback, opts)",
    purpose:
      "On/off switch. The callback receives the new boolean state. Initial state is read from the flag when available.",
    options: "Flag, Description",
    returns: "Get, Set, Reset",
    example:
      'local toggle = tab:AddToggle("God Mode", function(state) print(state) end, { Flag = "godmode" })\ntoggle:Set(true)\nprint(toggle:Get())',
  },
  {
    name: "AddCheckbox",
    signature: "tab:AddCheckbox(text, default, callback, opts)",
    purpose:
      "Checkbox with a square indicator. Initial boolean value applies when no saved flag exists.",
    options: "Flag, Description",
    returns: "Get, Set, Toggle, Reset",
    example:
      'local check = tab:AddCheckbox("Show FPS", false, function(state) end, { Flag = "show_fps" })\ncheck:Toggle()',
  },
  {
    name: "AddToggleGroup",
    signature: "tab:AddToggleGroup(title, list, opts)",
    purpose:
      "Group of toggles. Set Single = true for radio-style behavior. OnChanged receives the item name and state.",
    options:
      "Single, OnChanged; each list item: text, default, callback, description",
    returns: "Get, Set, GetAll, Reset",
    example:
      'local group = tab:AddToggleGroup("Features", {\n  { text = "Auto Farm", default = false, callback = function(s) end },\n  { text = "Auto Sell", default = true, callback = function(s) end },\n}, { Single = false, OnChanged = function(name, state) end })\nprint(group:Get("Auto Farm"))',
  },
  {
    name: "AddInput",
    signature: "tab:AddInput(text, placeholder, callback, opts)",
    purpose:
      "Text input with optional type and bounds validation. Callback receives the validated value on focus loss.",
    options: 'Type = "any" | "text" | "number", Min, Max, Flag, Description',
    returns: "Get, Set, Reset",
    example:
      'local input = tab:AddInput("Player Name", "Enter name…", function(value) print(value) end, { Type = "text", Min = 1, Max = 50, Flag = "player_name" })\nprint(input:Get())',
  },
  {
    name: "AddSlider",
    signature: "tab:AddSlider(text, min, max, default, step, callback, opts)",
    purpose:
      "Numeric range selector with -/+ buttons, draggable bar and editable value box. Callback receives the selected number. Suffix adds a unit label.",
    options:
      'Suffix, Flag, Description; alternate signature accepts suffix string before callback',
    returns: "Get, Set, Reset",
    example:
      'local slider = tab:AddSlider("Speed", 16, 100, 16, 1, function(value) print(value) end, { Suffix = "studs", Flag = "speed" })\nslider:Set(50)',
  },
  {
    name: "AddRangeSlider",
    signature: "tab:AddRangeSlider(text, min, max, defMin, defMax, callback, opts)",
    purpose:
      "Selects a minimum and maximum value with two draggable handles. Callback receives vMin and vMax.",
    options: "Step, Flag, Description",
    returns: "Get, Set, Reset; Get() returns vMin, vMax",
    example:
      'local range = tab:AddRangeSlider("Time", 0, 24, 6, 18, function(vMin, vMax) end, { Step = 1, Flag = "time_range" })\nlocal minValue, maxValue = range:Get()',
  },
  {
    name: "AddProgressBar",
    signature: "tab:AddProgressBar(text, min, max, default, opts)",
    purpose:
      "Displays progress as an animated fill. Set or increment progress programmatically. ShowValue toggle controls the numeric label.",
    options: "Suffix, ShowValue, Flag, Description, Callback",
    returns: "Get, Set, Add, SetText, SetLabel, Reset",
    example:
      'local progress = tab:AddProgressBar("Loading", 0, 100, 0, { Suffix = "%", ShowValue = true, Flag = "load_progress" })\nprogress:Set(50)\nprogress:Add(10)',
  },
  {
    name: "AddDropdown",
    signature: "tab:AddDropdown(text, options, callback, opts)",
    purpose:
      "Single-selection dropdown with a virtualized list (16 rows) — supports 500+ options. Options may be strings or records with Text and Value. Auto search bar appears when > 8 options.",
    options: "Flag, Placeholder, Searchable, MaxHeight, SearchPlaceholder, Description",
    returns: "Get, Set, SetOptions, Reset",
    example:
      'local dropdown = tab:AddDropdown(\n  "Select", { "A", "B", "C" },\n  function(value) print(value) end,\n  { Flag = "selected", Placeholder = "Choose…", Searchable = true, MaxHeight = 240 }\n)\ndropdown:SetOptions({ "D", "E" })',
  },
  {
    name: "AddMultiDropdown",
    signature: "tab:AddMultiDropdown(text, options, callback, opts)",
    purpose:
      "Multi-selection dropdown (o.Multi = true internally). Callback receives an array of selected values.",
    options: "Same as AddDropdown",
    returns: "Same control methods as AddDropdown",
    example:
      'local multi = tab:AddMultiDropdown("Select many", { "A", "B", "C" }, function(values) print(#values) end, { Flag = "multi_sel" })',
  },
  {
    name: "AddSegmented",
    signature: "tab:AddSegmented(text, segments, default, callback, opts)",
    purpose:
      "Pill-style segmented selector (radio-like). Segments can be strings or { Text, Value } records.",
    options: "Flag",
    returns: "Get, Set, Reset",
    example:
      'local seg = tab:AddSegmented("Mode", { "Easy", "Normal", "Hard" }, "Normal", function(value) print(value) end, { Flag = "difficulty" })\nseg:Set("Hard")',
  },
  {
    name: "AddColorPicker",
    signature: "tab:AddColorPicker(text, defaultColor, callback, opts)",
    purpose:
      "HSV color picker with optional alpha channel, HEX/RGB(A) inputs, presets, and clipboard copy/paste (when executor supports it). Uses UIGradient for smooth SV + Hue.",
    options: "Alpha, Flag, Presets, Description",
    returns: "Get, GetAlpha, Set, SetAlpha, Reset",
    example:
      'local picker = tab:AddColorPicker(\n  "Highlight", Color3.fromRGB(255, 0, 0),\n  function(color, alpha) print(color, alpha) end,\n  { Alpha = true, Flag = "highlight", Presets = { Color3.new(1, 0, 0) } }\n)',
  },
  {
    name: "AddKeybind",
    signature: "tab:AddKeybind(text, defaultKey, callback, opts)",
    purpose:
      "Captures a keyboard key. Callback receives the key and whether the input is down. Invalid key names passed to Set are ignored (v1.16.0 fix).",
    options: "Flag, Timeout",
    returns: "Get, Set, Reset",
    example:
      'local keybind = tab:AddKeybind("Toggle UI", Enum.KeyCode.K, function(key, isDown) print(key.Name, isDown) end, { Flag = "toggle_key" })\nkeybind:Set("L")',
  },
  {
    name: "AddKeybindMode",
    signature: "tab:AddKeybindMode(text, defaultKey, callback, opts)",
    purpose:
      "Keybind with Hold, Toggle, or Always mode. Callback receives key, mode, and active state. SetMode resets latched/held state (v1.16.0 fix).",
    options: 'Mode = "Hold" | "Toggle" | "Always", Flag, Timeout',
    returns: "Get, GetMode, IsActive, Set, SetMode, Reset",
    example:
      'local modeKey = tab:AddKeybindMode(\n  "Aim Assist", Enum.KeyCode.Q,\n  function(key, mode, active) print(key.Name, mode, active) end,\n  { Mode = "Hold" }\n)\nmodeKey:SetMode("Toggle")',
  },
  {
    name: "AddToggleKeybind",
    signature: "tab:AddToggleKeybind(text, defaultKey, callback, opts)",
    purpose:
      "Combines a toggle state with a keybind. Active controls are registered in the window KeybindList (v1.16.0 fix — previously invisible).",
    options: "Flag, Timeout",
    returns: "Get, Set, Reset",
    example:
      'local fly = tab:AddToggleKeybind("Fly", Enum.KeyCode.F, function(state) print("fly:", state) end, { Timeout = 5 })',
  },
  {
    name: "AddSection",
    signature: "tab:AddSection(text, opts)",
    purpose:
      "Adds a collapsible titled section to group related controls. Clicking the header toggles collapse state.",
    options: "defaultCollapsed",
    returns: "Set, Get, SetCollapsed, Toggle, IsCollapsed, Expand, Collapse, Reset",
    example:
      'local sec = tab:AddSection("Movement", { defaultCollapsed = false })\nsec:AddToggle("Sprint", function(s) end)\nsec:Collapse()',
  },
  {
    name: "AddDivider",
    signature: "tab:AddDivider()",
    purpose: "Adds a visual divider between controls.",
    options: "None documented",
    returns: "MoveUp, MoveDown, Remove, Destroy (standard wrapper)",
    example: "tab:AddDivider()",
  },
  {
    name: "AddChip / AddTag",
    signature: "tab:AddChip(text, label, opts) / tab:AddTag(...)",
    purpose:
      "Compact status/tag display with optional close button. AddTag is an alias of AddChip.",
    options: "Color, Closable, OnClose, Flag, Description",
    returns: "Set, Get, Reset",
    example:
      'tab:AddChip("Status", "Active", {\n  Color = Color3.fromRGB(80, 200, 120),\n  Closable = true, OnClose = function() end, Flag = "status",\n})',
  },
  {
    name: "AddModuleCard",
    signature: "tab:AddModuleCard(cfg)",
    purpose:
      "Expandable card with title, description, enabled toggle, optional keybind, and nested controls. Nested Add* methods trigger the same lazy loading.",
    options:
      "Title, Description, Default, Keybind, Risky, Expanded, Flag, Callback",
    returns:
      "Get, Set, Reset, Expand, Collapse + every Add* method delegated to the parent tab",
    example:
      'local card = tab:AddModuleCard({\n  Title = "Auto Farm", Description = "Example module",\n  Default = false, Keybind = Enum.KeyCode.F,\n  Risky = false, Expanded = false, Callback = function(state) end,\n})\ncard:AddToggle("Loop", function(state) end)\ncard:AddSlider("Delay", 0, 5, 1, 0.1, function(value) end)\ncard:Expand()',
  },
];

const apiRows: DataRow[] = [
  ["Init(uid)", "Required initialization; sets the library/config identity."],
  ["CreateWindow(opts)", "Creates and returns a window object."],
  ["SetLiteMode(on)", "Manually selects the Desktop/Mobile layout profile."],
  ["IsLiteMode()", "Returns whether the Mobile/lite profile is active."],
  ["GetDeviceInfo()", "Returns Type, IsMobile, IsDesktop, Profile, and Input information."],
  ["HasFeature(name)", "Checks whether an executor capability is available, e.g. hasWriteFile."],
  ["RegisterTheme(name, table)", "Registers a custom theme."],
  ["GetThemes()", "Returns theme names in sorted order."],
  ["RemoveTheme(name)", "Removes a custom theme."],
  ["importTheme(table)", "Imports multiple themes."],
  ["GetLoadedModules()", "Returns an array of module keys currently loaded (excludes entrypoint 'init')."],
  ["IsModuleLoaded(name)", "true if the given module key is in the loaded set."],
  ["GetTotalModules()", "Returns the count of modules in the bundle (excludes entrypoint 'init')."],
  ["PreloadComponents(path, ...)", "Force-loads one or more lazy component modules."],
  ["LazyLoad(path)", "Low-level access to the internal _lazyRequire; returns the module table or nil."],
  ["GetLazyStats()", "Returns { loads, cacheHits, cached } for introspection."],
];

const windowRows: DataRow[] = [
  ["AddTab(name, opts)", "Creates a tab; use the returned object to call Add* element methods."],
  ["Notify(text, duration, opts)", "Displays a notification."],
  ["ShowConfirm(opts)", "Opens a confirmation dialog."],
  ["ClearStickyNotifications()", "Removes sticky notifications."],
  ["SetTitle(text)", "Changes the window title."],
  ["GetFlags() / SetFlag(name, value)", "Reads all flags or updates one flag."],
  ["LoadConfiguration() / ResetConfig()", "Reloads saved configuration or resets flags."],
  ["SetTheme(name, instant) / GetTheme()", "Changes or reads the active theme."],
  ["SetThemeAnimation(enabled, duration, stagger)", "Tune theme-switch animation."],
  ["GetThemeAnimation()", "Returns the current ThemeAnim config table."],
  ["GetVersion()", "Returns the library version string."],
  ["PrintDebug()", "Prints diagnostic information (ThemeReg, popups, listeners, pools, lazy stats)."],
  ["IsMinimized() / DoMinimize()", "Reads or changes minimized state."],
  ["Destroy()", "Destroys the window and its UI resources."],
];

type CodeProps = { children: ReactNode; language?: string };
type DataRow = readonly [label: string, description: string];
type SectionTitleProps = { children: ReactNode };

function Code({ children, language = "lua" }: CodeProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#252530] bg-[#0b0b10]">
      <div className="border-b border-[#252530] bg-[#111118] px-4 py-2">
        <span className="text-xs font-semibold text-[#777587]">{language}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-[#e7e2ff]">
        <code>{children}</code>
      </pre>
    </div>
  );
}
function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-4 font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}
type DataTableProps = { rows: readonly DataRow[]; first?: string; second?: string };

function DataTable({ rows, first = "Method", second = "Description" }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#252530]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[#252530] bg-[#111118] text-[#aaa5c0]">
          <tr>
            <th className="px-4 py-3 font-medium">{first}</th>
            <th className="px-4 py-3 font-medium">{second}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#252530] text-[#9695a8]">
          {rows.map((row) => (
            <tr key={row[0]}>
              <td className="px-4 py-3 align-top font-mono text-[#c4a5fd]">{row[0]}</td>
              <td className="px-4 py-3 align-top">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WikiPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <header className="mb-12 border-b border-white/5 pb-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#a78bfa]">
          NONAMEHUB / DOCUMENTATION
        </p>
        <h1 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Noname UI <span className="text-[#a78bfa]">Wiki</span>
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#9695a8]">
          Reference for Noname UI v1.16.0 — installation, lazy loading, public API,
          documented controls, themes, configuration, watermark widget, and
          maintenance notes.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "v1.16.0",
            "Roblox / Luau",
            "lazy loading",
            "9 built-in themes",
            "config schema 4",
          ].map((x) => (
            <span
              key={x}
              className="rounded-full border border-[#393044] bg-[#17121f] px-3 py-1 text-xs text-[#d9ccff]"
            >
              {x}
            </span>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-60">
          <div className="rounded-2xl border border-[#252530] bg-[#111118] p-4 lg:sticky lg:top-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#aaa5c0]">
              On this page
            </h3>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-lg px-3 py-2 text-sm text-[#9695a8] transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-14 pb-20">
          {/* ─────────────────── Overview ─────────────────── */}
          <section id="overview" className="scroll-mt-8">
            <SectionTitle>Overview</SectionTitle>
            <p className="mb-4 leading-relaxed text-[#9695a8]">
              Noname UI is a modular Roblox Luau library for building in-game
              interfaces. v1.16.0 is an optimization and maintenance release on
              top of the v1.15 architecture. It keeps full public-API
              compatibility with v1.12–v1.15 scripts.
            </p>
            <div className="rounded-xl border border-[#5b4a28] bg-[#211b11] p-4 text-sm leading-relaxed text-[#ead7a7]">
              <strong className="text-white">Configuration compatibility:</strong>{" "}
              the config-file tag stays <code>V-1.15.0</code> across v1.12–v1.16.
              It is intentionally decoupled from the library version, so
              existing config files load without any migration.
            </div>

            <h3 className="mb-3 mt-7 text-lg font-semibold text-white">
              What v1.16.0 changes
            </h3>
            <DataTable
              first="Area"
              second="Change"
              rows={[
                ["Lazy loading", "Only ~15% of the library initializes eagerly. Window, Containers, Search, and every element load on first use."],
                ["Keybind dispatch", "One shared InputBegan listener for all keybinds (O(k) per keystroke, k = handlers on that key)."],
                ["Config saving", "saveConfig is debounced 120 ms and routed through AsyncIO."],
                ["Search", "60 ms debounce + pooled result buttons — one render pass per keystroke burst."],
                ["Dropdown", "Persistent click handlers, virtualized list of 16 rows."],
                ["Theme application", "Diff-based updates; unchanged slots skip tween entirely."],
                ["DynamicProfile", "Heartbeat sampling disconnects when disabled (was: kept running)."],
                ["SaveManager", "CRC validation, .bak/.bak2 rotation, retries with backoff, per-flag sanitization."],
                ["Notifications (desktop)", "Stack bottom-right; mobile stays top-right, full-width."],
                ["Watermark widget", "Two-row layout, color-coded FPS/ping, session uptime, GetStats() API."],
              ]}
            />
          </section>

          {/* ─────────────────── Installation ─────────────────── */}
          <section id="installation" className="scroll-mt-8">
            <SectionTitle>Installation</SectionTitle>
            <h3 className="mb-3 text-lg font-semibold text-white">Hosted bundle (recommended for executors)</h3>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              The hosted bundle at <code>https://library.nonamehub.fyi/</code>
              (or <code>/latest.lua</code>) returns a single Lua chunk. All
              modules are concatenated with a <code>__require</code> shim and
              loaded on demand at runtime.
            </p>
            <Code>{`local NonameUI = loadstring(game:HttpGet("https://library.nonamehub.fyi/latest.lua"))()

NonameUI:Init("MyGame")
local win = NonameUI:CreateWindow({ Title = "My UI", Theme = "Dark" })`}</Code>
            <p className="mt-4 text-sm text-[#9695a8]">
              Requires <code>loadstring</code> and HTTP access — typical of
              Roblox executors. Config persistence additionally needs{" "}
              <code>writefile</code> / <code>readfile</code> / <code>isfile</code>.
            </p>

            <h3 className="mb-3 mt-7 text-lg font-semibold text-white">
              Roblox Studio / ModuleScripts
            </h3>
            <Code>{`-- Place the library folder in ReplicatedStorage, with init.lua as a ModuleScript
local NonameUI = require(game.ReplicatedStorage["NonameUI-1.16.0"])
NonameUI:Init("MyGame")`}</Code>

            <h3 className="mb-3 mt-7 text-lg font-semibold text-white">
              Optional executor capabilities
            </h3>
            <DataTable
              first="Capability"
              second="Effect when unavailable"
              rows={[
                ["writefile / readfile / isfile", "UI works, but config persistence is disabled (a warning is printed)."],
                ["gethui", "Falls back to game.CoreGui."],
                ["setclipboard / getclipboard", "Color HEX copy/paste and theme export are disabled."],
                ["getgenv", "Falls back to _G."],
              ]}
            />
            <p className="mt-3 text-sm text-[#9695a8]">
              Check a capability with{" "}
              <code>NonameUI:HasFeature(&quot;hasWriteFile&quot;)</code>.
            </p>
          </section>

          {/* ─────────────────── Quick start ─────────────────── */}
          <section id="quick-start" className="scroll-mt-8">
            <SectionTitle>Quick start</SectionTitle>
            <Code>{`local NonameUI = loadstring(game:HttpGet("https://library.nonamehub.fyi/latest.lua"))()

-- Initialization is required and sets the config identity
NonameUI:Init("MyGame")

local win = NonameUI:CreateWindow({
    Title = "My UI",
    Theme = "Dark",
    AutoProfile = false,
})

local tab = win:AddTab("Main", { Icon = "home" })
tab:AddLabel("Welcome to Noname UI")

tab:AddButton("Print Hello", function()
    print("Hello!")
    win:Notify("Clicked!", 2, { Type = "success" })
end)

tab:AddToggle("God Mode", function(state)
    print("God Mode:", state)
end, { Flag = "godmode" })

tab:AddSlider("Speed", 16, 100, 16, 1, function(value)
    print("Speed:", value)
end, { Flag = "speed", Suffix = "studs" })

tab:AddDropdown("Select Item", { "Sword", "Shield", "Potion" }, function(value)
    print("Selected:", value)
end)

win:Notify("Script loaded!", 3, { Type = "info" })`}</Code>
            <p className="mt-3 text-sm text-[#9695a8]">
              Use <code>Flag</code> for values that should persist across
              sessions. Always call <code>:Init()</code> before{" "}
              <code>:CreateWindow()</code>.
            </p>
          </section>

          {/* ─────────────────── Project structure ─────────────────── */}
          <section id="project-structure" className="scroll-mt-8">
            <SectionTitle>Project structure</SectionTitle>
            <p className="mb-4 text-sm text-[#9695a8]">
              The library is split into ~27 modules. In bundled mode they are
              packed into a single Lua file; in Studio mode they are individual
              ModuleScripts under a folder.
            </p>
            <Code>{`NonameUI-1.16.0/
├── init.lua                    # Public entry point / proxy API
├── Core/
│   ├── Context.lua             # Services, device, environment, sizing
│   ├── Bootstrap.lua           # Init, ErrorBus, keybind dispatch, save hooks
│   └── Window.lua              # CreateWindow, header, sidebar, watermark
├── Components/
│   ├── Primitives.lua          # Shared UI primitives
│   ├── Containers.lua          # Tabs, sections, dividers, module cards (lazy)
│   ├── Notifications.lua       # Notifications + ShowConfirm
│   ├── Input/                  # Button, Toggle, Slider, Input (lazy)
│   ├── Selection/              # Dropdown, Segmented, ColorPicker (lazy)
│   ├── Display/                # Label, Search (lazy)
│   └── Keyboard/               # Keybind, KeybindMode, ToggleKeybind (lazy)
├── Modules/
│   ├── ThemeManager.lua        # Themes and registration
│   └── SaveManager.lua         # Persistence, sanitization, CRC/backups
├── Utility/                    # Signals, Naming, MemoryPool, AsyncIO,
│                               # RateLimit, Migrations, ThemeRegistry,
│                               # GestureDetector
└── Extras/
    └── KeySystem.lua           # Optional; not auto-loaded`}</Code>
          </section>

          {/* ─────────────────── Lazy loading ─────────────────── */}
          <section id="lazy-loading" className="scroll-mt-8">
            <SectionTitle>Lazy loading</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              v1.16.0 ships ~13 modules eagerly and defers the rest. Deferred
              modules load only when the first method that needs them is called
              — e.g. the Toggle module loads the first time{" "}
              <code>tab:AddToggle()</code> runs, then is cached for the rest of
              the session.
            </p>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">
              Eager (loaded at <code>Init()</code>)
            </h3>
            <Code>{`Utility/Signals
Utility/Naming
Utility/MemoryPool
Utility/RateLimit
Utility/Migrations
Utility/AsyncIO
Utility/ThemeRegistry
Utility/GestureDetector
Modules/ThemeManager
Modules/SaveManager
Core/Context
Core/Bootstrap
Components/Primitives`}</Code>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">
              Deferred (loaded on first use)
            </h3>
            <Code>{`Core/Window                     → first :CreateWindow()
Components/Containers           → alongside Window
Components/Notifications        → alongside Window
Components/Display/Search       → first Ctrl+K / search button
Components/Display/Label        → first tab:AddLabel()
Components/Input/Button         → first tab:AddButton()
Components/Input/Toggle         → first tab:AddToggle()
Components/Input/Slider         → first tab:AddSlider()
Components/Input/Input          → first tab:AddInput()
Components/Selection/Dropdown   → first tab:AddDropdown()
Components/Selection/Segmented  → first tab:AddSegmented()
Components/Selection/ColorPicker→ first tab:AddColorPicker()
Components/Keyboard/Keybind     → first tab:AddKeybind()`}</Code>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">
              Introspection
            </h3>
            <Code>{`-- Which modules are already loaded?
for _, key in ipairs(NonameUI:GetLoadedModules()) do
    print(key)
end

-- Is a specific module loaded?
if NonameUI:IsModuleLoaded("Components/Input/Toggle") then
    print("Toggle is ready")
end

-- Force-load ahead of time
NonameUI:PreloadComponents("Components.Display.Search")

-- Low-level lazy counter
print(NonameUI:GetLazyStats())  -- { loads = N, cacheHits = N, cached = N }`}</Code>

            <div className="mt-4 rounded-xl border border-[#3a4a2a] bg-[#141b10] p-4 text-sm leading-relaxed text-[#c9e6a8]">
              <strong className="text-white">Note:</strong>{" "}
              <code>GetTotalModules()</code> and{" "}
              <code>GetLoadedModules()</code> both exclude the{" "}
              <code>init</code> entrypoint, so a fresh bundle reports{" "}
              <code>13 / 26</code> after loading and reaches{" "}
              <code>26 / 26</code> once every element has been touched at least
              once.
            </div>
          </section>

          {/* ─────────────────── Public API ─────────────────── */}
          <section id="public-api" className="scroll-mt-8">
            <SectionTitle>Public API</SectionTitle>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Module: <code>NonameUI</code>
            </h3>
            <DataTable rows={apiRows} />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Window options
            </h3>
            <DataTable
              first="Option"
              second="Type / default / meaning"
              rows={[
                ["Title", 'string; default "Noname UI" — window title.'],
                ["Theme", 'string; default "Dark" — initial theme name.'],
                ["AutoProfile", "boolean; default false — enables Desktop/Mobile profile switching."],
                ["MaxStickyNotifs", "number; default 3 — maximum number of concurrent sticky notifications."],
              ]}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Window methods
            </h3>
            <DataTable rows={windowRows} />

            <p className="mt-4 text-sm leading-relaxed text-[#9695a8]">
              Additional exposed fields: <code>I</code> (metadata),{" "}
              <code>version</code>/<code>Version</code>, <code>Signal</code>,{" "}
              <code>MemoryPool</code>, <code>AsyncIO</code>,{" "}
              <code>SaveManager</code>, <code>Themes</code>,{" "}
              <code>ErrorBus</code>, <code>Dispatcher</code>,{" "}
              <code>DynamicProfile</code>, <code>Executor</code>, <code>UI</code>,{" "}
              <code>Scale</code>, <code>Z</code>, <code>getIcon(name)</code>,{" "}
              <code>Device</code>, <code>Input</code>, <code>Runtime</code>.
            </p>
          </section>

          {/* ─────────────────── Elements ─────────────────── */}
          <section id="elements" className="scroll-mt-8">
            <SectionTitle>Element reference</SectionTitle>
            <p className="mb-6 text-sm leading-relaxed text-[#9695a8]">
              Call element methods on the tab returned by{" "}
              <code>window:AddTab()</code>, unless the control is nested inside
              an <code>AddModuleCard</code>. Every method that has a lazy module
              behind it will load that module the first time it is called.
            </p>

            <div className="mb-6 rounded-xl border border-[#252530] bg-[#111118] p-4">
              <h3 className="mb-2 font-semibold text-white">Catalog at a glance</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {elements.map((el) => (
                  <a
                    key={el.name}
                    href={`#${el.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="rounded-lg border border-[#252530] px-3 py-2 text-sm text-[#c4a5fd] hover:bg-white/5"
                  >
                    {el.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {elements.map((el) => (
                <article
                  key={el.name}
                  id={el.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="scroll-mt-8 rounded-2xl border border-[#252530] bg-[#101017] p-5"
                >
                  <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">
                    {el.name}
                  </h3>
                  <code className="mt-2 block wrap-break-word text-sm text-[#c4a5fd]">
                    {el.signature}
                  </code>
                  <p className="mt-3 text-sm leading-relaxed text-[#b0aec0]">
                    {el.purpose}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#9695a8]">
                    <strong className="text-[#d8d5e5]">Documented options:</strong>{" "}
                    {el.options}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#9695a8]">
                    <strong className="text-[#d8d5e5]">Return methods:</strong>{" "}
                    {el.returns}
                  </p>
                  <div className="mt-4">
                    <Code>{el.example}</Code>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#5b4a28] bg-[#211b11] p-4 text-sm leading-relaxed text-[#ead7a7]">
              <strong className="text-white">Wrapper methods:</strong> every
              element returned by an Add* call also exposes{" "}
              <code>MoveUp()</code>, <code>MoveDown()</code>,{" "}
              <code>MoveTo(target)</code>, <code>MoveToTop()</code>,{" "}
              <code>MoveToBottom()</code>, <code>SetOrder(n)</code>,{" "}
              <code>GetOrder()</code>, <code>Remove()</code>, and{" "}
              <code>Destroy()</code>.
            </div>
          </section>

          {/* ─────────────────── Notifications ─────────────────── */}
          <section id="notifications" className="scroll-mt-8">
            <SectionTitle>Notifications & dialogs</SectionTitle>

            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              <strong className="text-white">Positioning:</strong> on{" "}
              <strong>desktop</strong> notifications stack in the{" "}
              <strong>bottom-right corner</strong> (newest appear at the bottom,
              older ones push upward). On{" "}
              <strong>mobile</strong> they stack from the{" "}
              <strong>top-right</strong> and span the full usable width. This is
              automatic — no configuration required.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">Notify</h3>
            <Code>{`win:Notify("Saved successfully", 3, {
    Type = "success",      -- info | success | warn | error
    Title = "Settings",    -- custom title (defaults to type)
    sticky = false,        -- true = stays until manually dismissed
    sound = "",            -- empty string disables sound
    Actions = {
        { text = "OK", callback = function() end, dismiss = true },
    },
})`}</Code>
            <div className="mt-4">
              <DataTable
                first="Option"
                second="Meaning"
                rows={[
                  ["Type", 'info | success | warn | error; default "info".'],
                  ["Title", "Optional custom title (falls back to type)."],
                  ["sticky", "Boolean; when true, prevents auto-close."],
                  ["sound", "rbxassetid string; empty string disables sound."],
                  ["icon", "Override icon asset ID."],
                  ["Actions", "Array of { text, callback, dismiss } action buttons."],
                  ["noAutoDuration", "Skip the automatic +N seconds for long text."],
                ]}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#9695a8]">
              Up to <code>MaxStickyNotifs</code> (default 3) sticky
              notifications can be shown simultaneously — older ones are
              dismissed automatically. Non-sticky notifications are capped at{" "}
              <code>NotifPool</code> (5 desktop / 3 mobile).
            </p>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Confirmation dialog
            </h3>
            <Code>{`win:ShowConfirm({
    Title = "Delete?",
    Message = "This cannot be undone.",
    ConfirmText = "Yes",
    CancelText = "No",
    Danger = true,
    OnConfirm = function() end,
    OnCancel = function() end,
})

-- Remove all sticky notifications at once
win:ClearStickyNotifications()`}</Code>
          </section>

          {/* ─────────────────── Watermark ─────────────────── */}
          <section id="watermark" className="scroll-mt-8">
            <SectionTitle>Watermark & KeybindList</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Every window ships with a small overlay widget (top-right) showing
              live runtime metrics. It is exposed as{" "}
              <code>window.Watermark</code>.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">
              Watermark API
            </h3>
            <Code>{`-- Hide / show the widget
win.Watermark:SetVisible(false)
print(win.Watermark:IsVisible())

-- Read live metrics
local s = win.Watermark:GetStats()
print(s.fps, s.ping, s.uptime, s.stable)
--> 59.8  42  83.4  true

-- Cleanup (usually handled by win:Destroy())
win.Watermark:Destroy()`}</Code>
            <div className="mt-4">
              <DataTable
                first="GetStats() field"
                second="Meaning"
                rows={[
                  ["fps", "Rolling average from DynamicProfile sampler."],
                  ["ping", "Server data ping in ms (nil if unavailable)."],
                  ["uptime", "Seconds since window creation."],
                  ["profile", '"Desktop" or "Mobile".'],
                  ["version", "Library version string."],
                  ["stable", "false when FPS < 30 or ping > 200ms for 3+ ticks."],
                ]}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#9695a8]">
              Colors update automatically:
            </p>
            <DataTable
              first="Metric"
              second="Threshold colors"
              rows={[
                ["FPS", "≥ 55 green · ≥ 30 yellow · < 30 red"],
                ["Ping", "< 80 ms green · < 150 ms yellow · ≥ 150 ms red"],
                ["Uptime", "Always grey, format MM:SS or H:MM:SS after 1h"],
                ["Stability dot", "Red ● appears after 3 ticks of sustained bad metrics"],
              ]}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              KeybindList
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-[#9695a8]">
              A second overlay (below the watermark) listing currently active
              keybinds. Registers automatically when you call{" "}
              <code>tab:AddKeybindMode()</code> or{" "}
              <code>tab:AddToggleKeybind()</code>.
            </p>
            <Code>{`win.KeybindList:Register(name, key, getStateFn)
win.KeybindList:Update(name)
win.KeybindList:Unregister(name)
win.KeybindList:Destroy()`}</Code>
          </section>

          {/* ─────────────────── Themes ─────────────────── */}
          <section id="themes" className="scroll-mt-8">
            <SectionTitle>Themes</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Built-in themes:{" "}
              <strong className="text-white">
                Red, Orange, Yellow, Green, Aqua, Blue, Purple, Dark, Light
              </strong>
              .
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">Theme slots</h3>
            <DataTable
              first="Slot"
              second="Purpose"
              rows={[
                ["Background", "Main background."],
                ["Sidebar", "Tab sidebar."],
                ["Accent", "Accent color for buttons and active states."],
                ["Text / TextDark", "Primary and secondary text."],
                ["Element", "Element background."],
                ["Stroke", "Borders."],
                ["toggleActive / toggleInActive", "Toggle states."],
                ["Muted", "Placeholder/muted color."],
                ["Danger / DangerBg", "Danger state foreground/background."],
                ["Success / Warn", "Status colors."],
                ["SliderTrack", "Slider track."],
                ["Overlay", "Overlay surface."],
              ]}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Register and apply a custom theme
            </h3>
            <Code>{`NonameUI:RegisterTheme("MyTheme", {
    Background = Color3.fromRGB(20, 20, 30),
    Sidebar = Color3.fromRGB(30, 30, 45),
    Accent = Color3.fromRGB(0, 200, 255),
    -- unspecified slots are filled from Dark
})

win:SetTheme("MyTheme", true)   -- true = instant, no animation
print(win:GetTheme())`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Theme animation tuning
            </h3>
            <Code>{`-- From the module
NonameUI:SetThemeAnimation(true, 0.40, 0.012)
print(NonameUI:GetThemeAnimation())
-- { Enabled = true, Duration = 0.40, Stagger = 0.012,
--   LiveDuration = 0.18, FlashEnabled = true }

-- Or per window
win:SetThemeAnimation(true, 0.35, 0.008)`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Live Theme Editor
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#9695a8]">
              <li>Available from the Settings tab (gear icon in the header).</li>
              <li>
                Edits all 15 theme slots in real time; diff-based apply means
                only changed instances re-tween.
              </li>
              <li>
                Exports the current theme as a Lua table to the clipboard (when{" "}
                <code>setclipboard</code> is available).
              </li>
              <li>
                Saves custom themes under <code>__custom_themes</code> and
                intermediate overrides under <code>__live_theme_slots</code>.
              </li>
            </ul>
          </section>

          {/* ─────────────────── Configuration ─────────────────── */}
          <section id="configuration" className="scroll-mt-8">
            <SectionTitle>Configuration & flags</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Controls with a <code>Flag</code> option persist their state when
              filesystem access is available. Window position, size, theme, and
              custom themes also save automatically.
            </p>
            <Code>{`-- Read all flags
local flags = win:GetFlags()

-- Set a flag
win:SetFlag("godmode", true)

-- Reload saved data
win:LoadConfiguration()

-- Reset configuration flags
win:ResetConfig()`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Reserved internal keys
            </h3>
            <DataTable
              first="Key"
              second="Purpose"
              rows={[
                ["__ui_pos / __ui_size", "Window position and size."],
                ["__ui_theme", "Current theme."],
                ["__live_theme_slots", "Custom color overrides."],
                ["__custom_themes", "Saved custom themes."],
                ["__auto_profile / __debug_mode", "Profile/debug toggle states."],
                ["__theme_anim", "Animation toggle state."],
                ["__schema", "Config schema version used for migrations."],
              ]}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Format and recovery
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-[#9695a8]">
              The config identity combines the user UID, place ID, and the{" "}
              <strong className="text-white">frozen</strong> tag{" "}
              <code>V-1.15.0</code>. The JSON payload includes a CRC field and
              schema version. Backups rotate through <code>.bak</code> and{" "}
              <code>.bak2</code>; bad flags are individually discarded rather
              than rejecting the whole file.
            </p>
            <Code language="json">{`{
  "_crc": "abc12345",
  "_v": 4,
  "data": {
    "godmode": true,
    "speed": 42,
    "highlight": { "r": 1, "g": 0, "b": 0 }
  }
}`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Save behavior in v1.16.0
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#9695a8]">
              <li>
                <code>saveConfig()</code> is debounced 120 ms and routed through{" "}
                <code>AsyncIO.enqueue</code> — rapid slider drags coalesce into
                one disk write per 120 ms.
              </li>
              <li>
                Writes use retry + backoff, CRC, and rotating backups. A failed
                write restores <code>.bak</code>.
              </li>
              <li>
                <code>SaveManager.flush()</code> writes CRC + backups
                synchronously — designed for <code>BindToClose</code>.
              </li>
              <li>
                Without filesystem access the UI works but nothing persists
                (a single warning is printed at startup).
              </li>
            </ul>
          </section>

          {/* ─────────────────── Device ─────────────────── */}
          <section id="device" className="scroll-mt-8">
            <SectionTitle>Device & mobile behavior</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              The library supports Desktop and Mobile layout profiles with manual
              or automatic switching based on FPS.
            </p>
            <Code>{`-- Public module methods
NonameUI:SetLiteMode(true)
print(NonameUI:IsLiteMode())
local device = NonameUI:GetDeviceInfo()

-- DynamicProfile module
NonameUI.DynamicProfile.start()
NonameUI.DynamicProfile.setEnabled(false)   -- stops Heartbeat sampling
NonameUI.DynamicProfile.lockProfile("Mobile")
NonameUI.DynamicProfile.lockProfile(nil)     -- unlock
local stats = NonameUI.DynamicProfile.getStats()`}</Code>
            <p className="mt-3 text-sm leading-relaxed text-[#9695a8]">
              Auto-switch thresholds: FPS &lt; 45 for 1.5 s → Mobile; FPS &gt; 55
              for 3 s → Desktop. Sampling uses Heartbeat with a 0.5 s window.
              Touch gestures use a configurable deadzone and slope; on mobile the
              tab sidebar becomes a swipeable pageLayout.
            </p>
          </section>

          {/* ─────────────────── Advanced ─────────────────── */}
          <section id="advanced" className="scroll-mt-8">
            <SectionTitle>Advanced utilities</SectionTitle>
            <div className="space-y-5">
              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">MemoryPool</h3>
                <p className="mb-3 text-sm text-[#9695a8]">
                  Pools UIStroke, UICorner, Frame, TextLabel, ImageLabel,
                  ActionButton, UIGradient, and UIPadding. Releases use O(1)
                  FindFirstChildOfClass lookups.
                </p>
                <Code>{`local stats = NonameUI.MemoryPool.stats()
NonameUI.MemoryPool.drain()

local stroke = NonameUI.MemoryPool.acquire("UIStroke", parent)
NonameUI.MemoryPool.release("UIStroke", stroke) -- Parent must be nil`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">AsyncIO</h3>
                <Code>{`NonameUI.AsyncIO.enqueue(function()
    -- queued work
end)

local pending = NonameUI.AsyncIO.pending()
local busy    = NonameUI.AsyncIO.isBusy()
NonameUI.AsyncIO.drain(3)
NonameUI.AsyncIO.setBudget(0.008)
NonameUI.AsyncIO.setErrorHandler(function(err) warn(err) end)`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  KeybindDispatch
                </h3>
                <p className="mb-3 text-sm text-[#9695a8]">
                  One shared dispatcher for all keyboard handlers. Token can be
                  any Lua value (typically <code>{}</code>), used as the
                  unregister key.
                </p>
                <Code>{`local Dispatch = NonameUI:GetBootstrap().KeybindDispatch
local token = {}

Dispatch.registerKey(token, Enum.KeyCode.F, function(input)
    -- key pressed
end, function(input)
    -- key released
end)

Dispatch.unregister(token)
-- Dispatch.clear() removes all registered handlers`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">GestureDetector</h3>
                <Code>{`local GD = NonameUI:GetMods().GestureDetector
local handle = GD.onSwipe(myFrame, {
    Deadzone = 24, Threshold = 70, Slope = 1.6,
}, function(direction, dx, dy)
    -- direction: left | right | up | down
end)
handle.Disconnect()

GD.onLongPress(myButton, { Duration = 0.6 }, function(x, y) end)`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">RateLimit</h3>
                <Code>{`local limited = NonameUI.RateLimit.wrap(myFn, {
    Capacity = 30, RefillRate = 60,
})
local executed = limited()   -- true if executed, false if blocked
limited:reset()
local remaining = limited:remaining()`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">Search overlay</h3>
                <p className="mb-3 text-sm text-[#9695a8]">
                  A global search tab opened with Ctrl+K or the search icon in
                  the header. It loads lazily the first time it is opened.
                </p>
                <Code>{`-- Opened via Ctrl+K or the search button.
-- Programmatic (via internal handle):
local s = NonameUI:GetMods().Search
-- The public wrapper is generally the Ctrl+K handler;
-- PreloadComponents("Components.Display.Search") loads it ahead of time.`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Config migrations
                </h3>
                <Code>{`NonameUI.Migrations.register(fromVersion, function(flags)
    -- transform flags from an older schema
end)
local schema = NonameUI.Migrations.currentSchema() -- 4`}</Code>
              </article>

              <article className="rounded-xl border border-[#252530] bg-[#101017] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Optional KeySystem extra
                </h3>
                <p className="mb-3 text-sm text-[#9695a8]">
                  <code>Extras/KeySystem.lua</code> is not wired into{" "}
                  <code>init.lua</code> — require it explicitly.
                </p>
                <Code>{`local KS = require(game.ReplicatedStorage["NonameUI-1.16.0"].Extras.KeySystem)

KS:Prompt({
    Title = "Enter Key",
    FileName = "mygame_key.txt",
    Validate = function(key) return key == "example" end,
    OnSuccess = function() print("Validated") end,
    OnFail = function(reason) warn(reason) end,
})

KS:IsValidated("mygame_key.txt", validateFn)
KS:ClearKey("mygame_key.txt")`}</Code>
              </article>
            </div>
          </section>

          {/* ─────────────────── Migration ─────────────────── */}
          <section id="migration" className="scroll-mt-8">
            <SectionTitle>Migration v1.15 → v1.16</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Normal scripts should not need API changes. Notable behavior fixes
              and additions include:
            </p>
            <DataTable
              first="Area"
              second="v1.16.0 behavior"
              rows={[
                ["AddKeybindMode:IsActive()", "In Always mode, reports active while the key is held."],
                ["AddKeybindMode:SetMode()", "Resets held/latched state when changing modes."],
                ["AddToggleKeybind", "Active toggle-keybinds are now visible in KeybindList."],
                ["AddKeybind:Set(invalid key)", "Invalid key strings are silently ignored (was: crash)."],
                ["DynamicProfile.setEnabled(false)", "Actually disconnects the Heartbeat sampler (was: kept alive)."],
                ["Config tag", "Remains V-1.15.0 — do not change to the library version."],
                ["Theme application", "Diff-based; unchanged theme values are skipped."],
                ["saveConfig()", "Debounced 120 ms and routed through AsyncIO."],
                ["Notifications (desktop)", "Now stack bottom-right instead of top-right."],
                ["Lazy loading", "Modules load on first use — Init() no longer loads everything."],
              ]}
            />
            <p className="mt-4 text-sm text-[#9695a8]">
              When moving from a local ModuleScript install to the hosted lazy
              loader, verify that every referenced module is published under the
              loader&apos;s root path.
            </p>
          </section>

          {/* ─────────────────── Troubleshooting ─────────────────── */}
          <section id="troubleshooting" className="scroll-mt-8">
            <SectionTitle>Troubleshooting</SectionTitle>
            <div className="space-y-3">
              {(
                [
                  [
                    "attempt to index nil with 'Context'",
                    "Likely cause: incorrect require/load order or Core/Context.lua did not load. Verify the module tree, or — for the bundled build — that all modules are correctly concatenated.",
                  ],
                  [
                    "config persistence disabled",
                    "The environment lacks writefile/readfile/isfile. UI works, but saved settings will not persist. Check NonameUI:HasFeature(\"hasWriteFile\").",
                  ],
                  [
                    "[Signal] attempt to call nil",
                    "A nil or non-function callback was passed to Connect. Verify callbacks are functions.",
                  ],
                  [
                    "Dropdown opens below the screen",
                    "v1.16.0 includes popup repositioning with onOutOfView. If it persists, verify the deployed Window/Dropdown implementation and that _markPopupDirty is firing on scroll/absolute-size changes.",
                  ],
                  [
                    "Notifications do not appear",
                    "Check that window._notifyHolder is set and Notifications.install(window, actx) is called during CreateWindow.",
                  ],
                  [
                    "Theme updates feel slow",
                    "Large sets of tracked instances may fall back to instant apply. Also see ThemeReg.setThrottle(0) to disable throttling for live-editor scenarios.",
                  ],
                  [
                    "Mobile tab swipe does not work",
                    "The gesture slope/deadzone may reject short or diagonal swipes. Check GestureDetector.onSwipe configuration.",
                  ],
                  [
                    "IsActive() behavior changed",
                    "For AddKeybindMode: Hold is active while held; Toggle stays active after a press until toggled off; Always is active while the key is held.",
                  ],
                  [
                    "ScrollingFrame passed to PageLayout JumpTo is not part of the layout",
                    "A deferred selectTab fired after window:Destroy(). v1.16.0 adds guards for tBtn.Parent and page.Parent; update to the latest bundled build if you see this.",
                  ],
                  [
                    "[NonameUI/lazy] Failed to load '…'",
                    "A lazy module path is missing from the bundle. Run build.js again and verify the missing module file exists in the source tree.",
                  ],
                ] as const
              ).map(([title, body]) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#252530] bg-[#101017] p-4"
                >
                  <h3 className="mb-1 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#9695a8]">{body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ─────────────────── Changelog ─────────────────── */}
          <section id="changelog" className="scroll-mt-8">
            <SectionTitle>Changelog summary — v1.16.0</SectionTitle>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#9695a8]">
              <li>
                <strong className="text-white">Lazy loading</strong> — only
                Utility + Modules + Context + Bootstrap + Primitives are eager.
                Window, Containers, Notifications, Search, and every element
                load on first use. Exposed via <code>GetLoadedModules</code>,{" "}
                <code>IsModuleLoaded</code>, <code>GetTotalModules</code>,{" "}
                <code>PreloadComponents</code>.
              </li>
              <li>
                <strong className="text-white">KeybindDispatch</strong> — one
                shared InputBegan/InputEnded listener for all keybinds; O(k) per
                keystroke.
              </li>
              <li>
                <strong className="text-white">Save pipeline</strong> — 120 ms
                debounce + AsyncIO; CRC + .bak/.bak2 rotation + retries;
                SaveManager.flush() handles shutdown safely.
              </li>
              <li>
                <strong className="text-white">Search</strong> — 60 ms debounce +
                pooled result buttons.
              </li>
              <li>
                <strong className="text-white">Dropdown</strong> — virtualized
                list (16 rows), persistent handlers, autocomplete when &gt; 8
                options.
              </li>
              <li>
                <strong className="text-white">Themes</strong> — diff-based apply;
                unchanged slots skip tween.
              </li>
              <li>
                <strong className="text-white">DynamicProfile</strong> — Heartbeat
                sampling disconnects when disabled.
              </li>
              <li>
                <strong className="text-white">Notifications (desktop)</strong> —
                stack bottom-right; mobile stays top-right, full-width.
              </li>
              <li>
                <strong className="text-white">Watermark</strong> — two-row
                layout, color-coded FPS/ping, uptime,{" "}
                <code>GetStats()</code>.
              </li>
              <li>
                <strong className="text-white">Fixes</strong> — AddKeybindMode
                state reset, ToggleKeybind KeybindList registration, invalid
                keybind Set no-op, DynamicProfile sampler shutdown, AddSlider
                bad min/max warning.
              </li>
              <li>
                <strong className="text-white">Config compatibility tag</strong>{" "}
                — stays <code>V-1.15.0</code>; existing configs load unchanged.
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-[#252530] bg-[#111118] p-4 text-sm leading-relaxed text-[#9695a8]">
              <strong className="text-white">Next (v2.0.0 roadmap):</strong>{" "}
              removal of deprecated DragController, pruned ThemeReg dirty flags,
              AsyncIO budget tuning API, config-schema v5 with a live-slot →
              custom-theme promotion, and a config-file path migration.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}