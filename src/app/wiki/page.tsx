import type { ReactNode } from "react";

export const metadata = {
  title: "Noname UI — NoNameHub",
  description:
    "Noname UI v1.16.0 reference: installation, public API, elements, themes, configuration.",
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick start" },
  { id: "project-structure", label: "Project structure" },
  { id: "lazy-loading", label: "Lazy loading" },
  { id: "public-api", label: "Public API" },
  { id: "elements", label: "Elements" },
  { id: "notifications", label: "Notifications" },
  { id: "watermark", label: "Watermark" },
  { id: "themes", label: "Themes" },
  { id: "configuration", label: "Configuration" },
  { id: "device", label: "Device & mobile" },
  { id: "advanced", label: "Advanced" },
  { id: "migration", label: "Migration" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "changelog", label: "Changelog" },
];

const elements = [
  {
    name: "AddLabel",
    signature: "tab:AddLabel(text, opts)",
    options:
      "Color, Bg, Icon, IconColor, Subtitle, SubtitleColor, Bold, RichText, Accent, Align, TextSize, Typewriter, TypeSpeed, Pulse, Clickable, Description",
    returns:
      "Set, SetColor, SetIcon, SetSubtitle, SetBold, SetAlign, SetVisible, Get, GetInstance, StopTypewriter, Reset",
    example:
      'local label = tab:AddLabel("Hello", { Icon = "info", Accent = true })\nlabel:Set("Ready")',
  },
  {
    name: "AddButton",
    signature: "tab:AddButton(text, callback, opts)",
    options: "Description",
    returns: "SetEnabled, Disable, Enable, IsEnabled, Reset",
    example:
      'local button = tab:AddButton("Run", function() print("clicked") end)\nbutton:Disable("Unavailable")\nbutton:Enable()',
  },
  {
    name: "AddButtonRow",
    signature: "tab:AddButtonRow(buttons, opts)",
    options: "Per-button: Text, Callback, Danger",
    returns: "Reset + wrapper methods",
    example:
      'tab:AddButtonRow({\n  { Text = "Save", Callback = function() end },\n  { Text = "Reset", Callback = function() end, Danger = true },\n})',
  },
  {
    name: "AddToggle",
    signature: "tab:AddToggle(text, callback, opts)",
    options: "Flag, Description",
    returns: "Get, Set, Reset",
    example:
      'local toggle = tab:AddToggle("God Mode", function(s) print(s) end, { Flag = "godmode" })\ntoggle:Set(true)',
  },
  {
    name: "AddCheckbox",
    signature: "tab:AddCheckbox(text, default, callback, opts)",
    options: "Flag, Description",
    returns: "Get, Set, Toggle, Reset",
    example:
      'tab:AddCheckbox("Show FPS", false, function(s) end, { Flag = "show_fps" }):Toggle()',
  },
  {
    name: "AddToggleGroup",
    signature: "tab:AddToggleGroup(title, list, opts)",
    options: "Single, OnChanged; each item: text, default, callback, description",
    returns: "Get, Set, GetAll, Reset",
    example:
      'tab:AddToggleGroup("Features", {\n  { text = "Auto Farm", default = false },\n  { text = "Auto Sell", default = true },\n}, { Single = false, OnChanged = function(name, state) end })',
  },
  {
    name: "AddInput",
    signature: "tab:AddInput(text, placeholder, callback, opts)",
    options: 'Type = "any" | "text" | "number", Min, Max, Flag, Description',
    returns: "Get, Set, Reset",
    example:
      'tab:AddInput("Name", "Enter…", function(v) print(v) end, { Type = "text", Min = 1, Max = 50 })',
  },
  {
    name: "AddSlider",
    signature: "tab:AddSlider(text, min, max, default, step, callback, opts)",
    options: "Suffix, Flag, Description",
    returns: "Get, Set, Reset",
    example:
      'tab:AddSlider("Speed", 16, 100, 16, 1, function(v) print(v) end, { Suffix = "studs", Flag = "speed" })',
  },
  {
    name: "AddRangeSlider",
    signature: "tab:AddRangeSlider(text, min, max, defMin, defMax, callback, opts)",
    options: "Step, Flag, Description",
    returns: "Get (returns vMin, vMax), Set, Reset",
    example:
      'tab:AddRangeSlider("Time", 0, 24, 6, 18, function(vMin, vMax) end, { Step = 1 })',
  },
  {
    name: "AddProgressBar",
    signature: "tab:AddProgressBar(text, min, max, default, opts)",
    options: "Suffix, ShowValue, Flag, Description, Callback",
    returns: "Get, Set, Add, SetText, SetLabel, Reset",
    example:
      'local p = tab:AddProgressBar("Loading", 0, 100, 0, { Suffix = "%" })\np:Set(50); p:Add(10)',
  },
  {
    name: "AddDropdown",
    signature: "tab:AddDropdown(text, options, callback, opts)",
    options: "Flag, Placeholder, Searchable, MaxHeight, SearchPlaceholder, Description",
    returns: "Get, Set, SetOptions, Reset",
    example:
      'tab:AddDropdown("Select", { "A", "B", "C" }, function(v) print(v) end, { Searchable = true })',
  },
  {
    name: "AddMultiDropdown",
    signature: "tab:AddMultiDropdown(text, options, callback, opts)",
    options: "Same as AddDropdown",
    returns: "Same as AddDropdown; callback receives array of selected values",
    example:
      'tab:AddMultiDropdown("Select many", { "A", "B", "C" }, function(vals) print(#vals) end)',
  },
  {
    name: "AddSegmented",
    signature: "tab:AddSegmented(text, segments, default, callback, opts)",
    options: "Flag",
    returns: "Get, Set, Reset",
    example:
      'tab:AddSegmented("Mode", { "Easy", "Normal", "Hard" }, "Normal", function(v) print(v) end)',
  },
  {
    name: "AddColorPicker",
    signature: "tab:AddColorPicker(text, defaultColor, callback, opts)",
    options: "Alpha, Flag, Presets, Description",
    returns: "Get, GetAlpha, Set, SetAlpha, Reset",
    example:
      'tab:AddColorPicker("Highlight", Color3.fromRGB(255, 0, 0), function(c, a) end, { Alpha = true })',
  },
  {
    name: "AddKeybind",
    signature: "tab:AddKeybind(text, defaultKey, callback, opts)",
    options: "Flag, Timeout",
    returns: "Get, Set, Reset",
    example:
      'tab:AddKeybind("Toggle UI", Enum.KeyCode.K, function(key, down) print(key.Name, down) end)',
  },
  {
    name: "AddKeybindMode",
    signature: "tab:AddKeybindMode(text, defaultKey, callback, opts)",
    options: 'Mode = "Hold" | "Toggle" | "Always", Flag, Timeout',
    returns: "Get, GetMode, IsActive, Set, SetMode, Reset",
    example:
      'local k = tab:AddKeybindMode("Aim", Enum.KeyCode.Q, function(key, mode, active) end, { Mode = "Hold" })\nk:SetMode("Toggle")',
  },
  {
    name: "AddToggleKeybind",
    signature: "tab:AddToggleKeybind(text, defaultKey, callback, opts)",
    options: "Flag, Timeout",
    returns: "Get, Set, Reset",
    example:
      'tab:AddToggleKeybind("Fly", Enum.KeyCode.F, function(state) end)',
  },
  {
    name: "AddSection",
    signature: "tab:AddSection(text, opts)",
    options: "defaultCollapsed",
    returns: "Set, Get, SetCollapsed, Toggle, IsCollapsed, Expand, Collapse, Reset",
    example:
      'local sec = tab:AddSection("Movement")\nsec:AddToggle("Sprint", function(s) end)',
  },
  {
    name: "AddDivider",
    signature: "tab:AddDivider()",
    options: "—",
    returns: "wrapper methods",
    example: "tab:AddDivider()",
  },
  {
    name: "AddChip / AddTag",
    signature: "tab:AddChip(text, label, opts)",
    options: "Color, Closable, OnClose, Flag, Description",
    returns: "Set, Get, Reset",
    example:
      'tab:AddChip("Status", "Active", { Color = Color3.fromRGB(80, 200, 120), Closable = true })',
  },
  {
    name: "AddModuleCard",
    signature: "tab:AddModuleCard(cfg)",
    options: "Title, Description, Default, Keybind, Risky, Expanded, Flag, Callback",
    returns: "Get, Set, Reset, Expand, Collapse + every Add* method delegated",
    example:
      'local card = tab:AddModuleCard({ Title = "Auto Farm", Description = "Example" })\ncard:AddToggle("Loop", function(s) end)\ncard:Expand()',
  },
];

const apiRows: DataRow[] = [
  ["Init(uid)", "Required. Sets config identity."],
  ["CreateWindow(opts)", "Returns a window object."],
  ["SetLiteMode(on)", "Switch Desktop/Mobile profile."],
  ["IsLiteMode()", "Current profile is Mobile."],
  ["GetDeviceInfo()", "Type, IsMobile, IsDesktop, Profile, Input."],
  ["HasFeature(name)", "Check executor capability."],
  ["RegisterTheme(name, t)", "Register a custom theme."],
  ["GetThemes()", "Sorted theme names."],
  ["RemoveTheme(name)", "Remove a custom theme."],
  ["importTheme(t)", "Import multiple themes."],
  ["GetLoadedModules()", "Loaded module keys (excludes init)."],
  ["IsModuleLoaded(name)", "true if module is loaded."],
  ["GetTotalModules()", "Total module count (excludes init)."],
  ["PreloadComponents(...)", "Force-load lazy modules."],
  ["LazyLoad(path)", "Low-level lazy require."],
  ["GetLazyStats()", "{ loads, cacheHits, cached }"],
];

const windowRows: DataRow[] = [
  ["AddTab(name, opts)", "Returns a tab for Add* calls."],
  ["Notify(text, duration, opts)", "Show notification."],
  ["ShowConfirm(opts)", "Confirm dialog."],
  ["ClearStickyNotifications()", "Remove sticky notifications."],
  ["SetTitle(text)", "Change title."],
  ["GetFlags() / SetFlag(n, v)", "Read / write flags."],
  ["LoadConfiguration() / ResetConfig()", "Reload / reset config."],
  ["SetTheme(name, instant) / GetTheme()", "Change / read theme."],
  ["SetThemeAnimation(e, d, s)", "Tune theme animation."],
  ["GetVersion()", "Version string."],
  ["PrintDebug()", "Diagnostics."],
  ["IsMinimized() / DoMinimize()", "Minimize state / toggle."],
  ["Destroy()", "Destroy window."],
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
    <h2 className="mb-4 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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
      <header className="mb-10 border-b border-white/5 pb-8">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#a78bfa]">
          NONAMEHUB / DOCS
        </p>
        <h1 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Noname UI <span className="text-[#a78bfa]">v1.16.0</span>
        </h1>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="rounded-2xl border border-[#252530] bg-[#111118] p-4 lg:sticky lg:top-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#aaa5c0]">
              Contents
            </h3>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-lg px-3 py-1.5 text-sm text-[#9695a8] transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-14 pb-20">
          {/* Overview */}
          <section id="overview" className="scroll-mt-8">
            <SectionTitle>Overview</SectionTitle>
            <p className="leading-relaxed text-[#9695a8]">
              Noname UI is a modular Roblox Luau UI library. v1.16.0 keeps full
              API compatibility with v1.12–v1.15, adds lazy loading for ~50% of
              the library, replaces per-element keybind listeners with a shared
              dispatcher, and reworks the save pipeline.
            </p>
            <p className="mt-4 text-sm text-[#9695a8]">
              Config-file tag remains <code>V-1.15.0</code> — existing configs
              load without migration.
            </p>
          </section>

          {/* Installation */}
          <section id="installation" className="scroll-mt-8">
            <SectionTitle>Installation</SectionTitle>
            <Code>{`local NonameUI = loadstring(game:HttpGet("https://library.nonamehub.fyi/latest.lua"))()

NonameUI:Init("MyGame")
local win = NonameUI:CreateWindow({ Title = "My UI", Theme = "Dark" })`}</Code>
            <p className="mt-4 text-sm text-[#9695a8]">
              Requires <code>loadstring</code> and HTTP. Config persistence
              additionally requires <code>writefile</code> /{" "}
              <code>readfile</code> / <code>isfile</code>.
            </p>

            <h3 className="mb-3 mt-7 text-lg font-semibold text-white">
              Roblox Studio
            </h3>
            <Code>{`local NonameUI = require(game.ReplicatedStorage["NonameUI-1.16.0"])
NonameUI:Init("MyGame")`}</Code>

            <h3 className="mb-3 mt-7 text-lg font-semibold text-white">
              Optional capabilities
            </h3>
            <DataTable
              first="Capability"
              second="If missing"
              rows={[
                ["writefile / readfile / isfile", "Config persistence disabled (warning)."],
                ["gethui", "Falls back to game.CoreGui."],
                ["setclipboard / getclipboard", "Color HEX copy/paste disabled."],
                ["getgenv", "Falls back to _G."],
              ]}
            />
            <p className="mt-3 text-sm text-[#9695a8]">
              Check via <code>NonameUI:HasFeature(&quot;hasWriteFile&quot;)</code>.
            </p>
          </section>

          {/* Quick start */}
          <section id="quick-start" className="scroll-mt-8">
            <SectionTitle>Quick start</SectionTitle>
            <Code>{`local NonameUI = loadstring(game:HttpGet("https://library.nonamehub.fyi/latest.lua"))()
NonameUI:Init("MyGame")

local win = NonameUI:CreateWindow({
    Title = "My UI",
    Theme = "Dark",
    AutoProfile = false,
})

local tab = win:AddTab("Main", { Icon = "home" })
tab:AddLabel("Welcome")

tab:AddButton("Print Hello", function()
    print("Hello!")
    win:Notify("Clicked!", 2, { Type = "success" })
end)

tab:AddToggle("God Mode", function(state)
    print(state)
end, { Flag = "godmode" })

tab:AddSlider("Speed", 16, 100, 16, 1, function(v)
    print(v)
end, { Flag = "speed", Suffix = "studs" })`}</Code>
          </section>

          {/* Project structure */}
          <section id="project-structure" className="scroll-mt-8">
            <SectionTitle>Project structure</SectionTitle>
            <Code>{`NonameUI-1.16.0/
├── init.lua                    # Entry / proxy API
├── Core/
│   ├── Context.lua             # Services, device, sizing
│   ├── Bootstrap.lua           # Init, ErrorBus, keybind dispatch, save
│   └── Window.lua              # CreateWindow, header, sidebar, watermark
├── Components/
│   ├── Primitives.lua          # Shared UI primitives (eager)
│   ├── Containers.lua          # Tabs, sections, cards (lazy)
│   ├── Notifications.lua       # Notify + ShowConfirm (lazy)
│   ├── Input/                  # Button, Toggle, Slider, Input (lazy)
│   ├── Selection/              # Dropdown, Segmented, ColorPicker (lazy)
│   ├── Display/                # Label, Search (lazy)
│   └── Keyboard/               # Keybind variants (lazy)
├── Modules/
│   ├── ThemeManager.lua
│   └── SaveManager.lua
├── Utility/                    # Signals, Naming, MemoryPool, AsyncIO,
│                               # RateLimit, Migrations, ThemeRegistry,
│                               # GestureDetector
└── Extras/
    └── KeySystem.lua           # Optional; not auto-loaded`}</Code>
          </section>

          {/* Lazy loading */}
          <section id="lazy-loading" className="scroll-mt-8">
            <SectionTitle>Lazy loading</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              13 modules load at <code>Init()</code>. The rest load on first use
              and stay cached for the session.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">Eager</h3>
            <Code>{`Utility/Signals, Naming, MemoryPool, RateLimit,
Migrations, AsyncIO, ThemeRegistry, GestureDetector
Modules/ThemeManager, SaveManager
Core/Context, Bootstrap
Components/Primitives`}</Code>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">Deferred</h3>
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

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">Introspection</h3>
            <Code>{`NonameUI:GetLoadedModules()      -- array of loaded keys
NonameUI:IsModuleLoaded(name)    -- boolean
NonameUI:GetTotalModules()       -- count (excl. init)
NonameUI:PreloadComponents(path) -- force-load
NonameUI:GetLazyStats()          -- { loads, cacheHits, cached }`}</Code>
          </section>

          {/* Public API */}
          <section id="public-api" className="scroll-mt-8">
            <SectionTitle>Public API</SectionTitle>

            <h3 className="mb-3 text-lg font-semibold text-white">
              Module: <code>NonameUI</code>
            </h3>
            <DataTable rows={apiRows} />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              CreateWindow options
            </h3>
            <DataTable
              first="Option"
              second="Default / meaning"
              rows={[
                ["Title", '"Noname UI" — window title'],
                ["Theme", '"Dark" — initial theme'],
                ["AutoProfile", "false — Desktop↔Mobile auto-switch"],
                ["MaxStickyNotifs", "3 — concurrent sticky notifications"],
              ]}
            />

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Window methods
            </h3>
            <DataTable rows={windowRows} />
          </section>

          {/* Elements */}
          <section id="elements" className="scroll-mt-8">
            <SectionTitle>Elements</SectionTitle>
            <p className="mb-6 text-sm leading-relaxed text-[#9695a8]">
              All methods are called on the tab returned by{" "}
              <code>window:AddTab()</code>. Wrapper methods available on every
              return value: <code>MoveUp</code>, <code>MoveDown</code>,{" "}
              <code>MoveTo</code>, <code>MoveToTop</code>,{" "}
              <code>MoveToBottom</code>, <code>SetOrder</code>,{" "}
              <code>GetOrder</code>, <code>Remove</code>, <code>Destroy</code>.
            </p>

            <div className="space-y-4">
              {elements.map((el) => (
                <article
                  key={el.name}
                  id={el.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="scroll-mt-8 rounded-2xl border border-[#252530] bg-[#101017] p-5"
                >
                  <h3 className="font-['Space_Grotesk'] text-base font-semibold text-white">
                    {el.name}
                  </h3>
                  <code className="mt-2 block wrap-break-word text-sm text-[#c4a5fd]">
                    {el.signature}
                  </code>
                  <p className="mt-2 text-xs text-[#9695a8]">
                    <span className="text-[#d8d5e5]">Options:</span> {el.options}
                  </p>
                  <p className="mt-1 text-xs text-[#9695a8]">
                    <span className="text-[#d8d5e5]">Returns:</span> {el.returns}
                  </p>
                  <div className="mt-3">
                    <Code>{el.example}</Code>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section id="notifications" className="scroll-mt-8">
            <SectionTitle>Notifications</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Desktop: bottom-right stack. Mobile: top-right, full width.
            </p>

            <Code>{`win:Notify("Saved", 3, {
    Type = "success",      -- info | success | warn | error
    Title = "Settings",
    sticky = false,
    sound = "",            -- "" disables
    Actions = {
        { text = "OK", callback = function() end, dismiss = true },
    },
})`}</Code>

            <div className="mt-4">
              <DataTable
                first="Option"
                second="Meaning"
                rows={[
                  ["Type", 'info | success | warn | error; default "info"'],
                  ["Title", "Custom title"],
                  ["sticky", "Prevent auto-close"],
                  ["sound", "rbxassetid; empty string disables"],
                  ["icon", "Override icon"],
                  ["Actions", "{ text, callback, dismiss }[]"],
                  ["noAutoDuration", "Skip auto duration extension"],
                ]}
              />
            </div>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              ShowConfirm
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

win:ClearStickyNotifications()`}</Code>
          </section>

          {/* Watermark */}
          <section id="watermark" className="scroll-mt-8">
            <SectionTitle>Watermark</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Two-row overlay (top-right): title + version; FPS, ping, uptime,
              and a red dot after 3 ticks of sustained bad metrics.
            </p>

            <Code>{`win.Watermark:SetVisible(false)
win.Watermark:IsVisible()

local s = win.Watermark:GetStats()
-- { fps, ping, uptime, profile, version, stable }

win.Watermark:Destroy()  -- usually handled by win:Destroy()`}</Code>

            <p className="mt-4 text-sm text-[#9695a8]">
              Colors: FPS <code>≥55 green / ≥30 yellow / &lt;30 red</code> · Ping{" "}
              <code>&lt;80 green / &lt;150 yellow / ≥150 red</code>.
            </p>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              KeybindList
            </h3>
            <p className="mb-3 text-sm text-[#9695a8]">
              Second overlay (below watermark). Auto-populates from{" "}
              <code>AddKeybindMode</code> and <code>AddToggleKeybind</code>.
            </p>
            <Code>{`win.KeybindList:Register(name, key, getStateFn)
win.KeybindList:Update(name)
win.KeybindList:Unregister(name)`}</Code>
          </section>

          {/* Themes */}
          <section id="themes" className="scroll-mt-8">
            <SectionTitle>Themes</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Built-in: <strong className="text-white">Red, Orange, Yellow, Green, Aqua, Blue, Purple, Dark, Light</strong>.
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">Slots</h3>
            <Code>{`Background, Sidebar, Accent
Text, TextDark, Element, Stroke
toggleActive, toggleInActive
Muted, Danger, DangerBg, Success, Warn
SliderTrack, Overlay`}</Code>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">
              Custom theme
            </h3>
            <Code>{`NonameUI:RegisterTheme("MyTheme", {
    Background = Color3.fromRGB(20, 20, 30),
    Accent = Color3.fromRGB(0, 200, 255),
    -- unspecified slots fall back to Dark
})

win:SetTheme("MyTheme", true)  -- true = instant`}</Code>

            <h3 className="mb-3 mt-6 text-lg font-semibold text-white">
              Animation
            </h3>
            <Code>{`NonameUI:SetThemeAnimation(true, 0.40, 0.012)
-- { Enabled, Duration, Stagger, LiveDuration, FlashEnabled }

win:SetThemeAnimation(true, 0.35, 0.008)  -- per-window`}</Code>

            <p className="mt-4 text-sm text-[#9695a8]">
              Live Theme Editor is available from the Settings tab. Custom
              themes save under <code>__custom_themes</code>, overrides under{" "}
              <code>__live_theme_slots</code>.
            </p>
          </section>

          {/* Configuration */}
          <section id="configuration" className="scroll-mt-8">
            <SectionTitle>Configuration</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              Controls with <code>Flag</code> persist when the executor
              supports filesystem. Config tag stays{" "}
              <code>V-1.15.0</code> (frozen across v1.12–v1.16).
            </p>
            <Code>{`local flags = win:GetFlags()
win:SetFlag("godmode", true)
win:LoadConfiguration()
win:ResetConfig()`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">
              Reserved keys
            </h3>
            <Code>{`__ui_pos, __ui_size
__ui_theme
__live_theme_slots, __custom_themes
__auto_profile, __debug_mode, __theme_anim
__schema`}</Code>

            <h3 className="mb-3 mt-8 text-lg font-semibold text-white">Format</h3>
            <Code language="json">{`{
  "_crc": "abc12345",
  "_v": 4,
  "data": { "godmode": true, "speed": 42 }
}`}</Code>

            <p className="mt-4 text-sm leading-relaxed text-[#9695a8]">
              <code>saveConfig()</code> is debounced 120 ms and routed through
              AsyncIO. Writes use retry + backoff + CRC +{" "}
              <code>.bak</code>/<code>.bak2</code> rotation.{" "}
              <code>SaveManager.flush()</code> runs synchronously for{" "}
              <code>BindToClose</code>. Bad flags are discarded individually.
            </p>
          </section>

          {/* Device */}
          <section id="device" className="scroll-mt-8">
            <SectionTitle>Device & mobile</SectionTitle>
            <Code>{`NonameUI:SetLiteMode(true)
NonameUI:IsLiteMode()
NonameUI:GetDeviceInfo()

NonameUI.DynamicProfile.setEnabled(false)     -- stops Heartbeat
NonameUI.DynamicProfile.lockProfile("Mobile")
NonameUI.DynamicProfile.lockProfile(nil)       -- unlock
NonameUI.DynamicProfile.getStats()`}</Code>
            <p className="mt-3 text-sm text-[#9695a8]">
              Auto-switch: FPS &lt; 45 for 1.5 s → Mobile; FPS &gt; 55 for 3 s
              → Desktop. Sampling on Heartbeat (0.5 s window). Mobile sidebar
              becomes a swipeable pageLayout.
            </p>
          </section>

          {/* Advanced */}
          <section id="advanced" className="scroll-mt-8">
            <SectionTitle>Advanced</SectionTitle>
            <div className="space-y-4">
              <Code>{`-- MemoryPool
NonameUI.MemoryPool.stats()
NonameUI.MemoryPool.drain()
NonameUI.MemoryPool.acquire("UIStroke", parent)
NonameUI.MemoryPool.release("UIStroke", stroke)  -- Parent must be nil

-- AsyncIO
NonameUI.AsyncIO.enqueue(function() end)
NonameUI.AsyncIO.drain(3)
NonameUI.AsyncIO.setBudget(0.008)
NonameUI.AsyncIO.setErrorHandler(warn)

-- KeybindDispatch
local D = NonameUI:GetBootstrap().KeybindDispatch
local tok = {}
D.registerKey(tok, Enum.KeyCode.F,
    function(i) end,     -- began
    function(i) end)     -- ended
D.unregister(tok)

-- GestureDetector
local GD = NonameUI:GetMods().GestureDetector
local h = GD.onSwipe(frame, { Deadzone = 24, Threshold = 70, Slope = 1.6 },
    function(dir, dx, dy) end)
h.Disconnect()
GD.onLongPress(btn, { Duration = 0.6 }, function(x, y) end)

-- RateLimit
local rl = NonameUI.RateLimit.wrap(fn, { Capacity = 30, RefillRate = 60 })
rl()          -- true = executed, false = blocked
rl:reset()
rl:remaining()

-- Migrations
NonameUI.Migrations.register(fromVer, function(flags) end)
NonameUI.Migrations.currentSchema()  -- 4`}</Code>
            </div>
          </section>

          {/* Migration */}
          <section id="migration" className="scroll-mt-8">
            <SectionTitle>Migration v1.15 → v1.16</SectionTitle>
            <p className="mb-4 text-sm leading-relaxed text-[#9695a8]">
              No API changes required. Behavior fixes:
            </p>
            <DataTable
              first="Area"
              second="v1.16.0"
              rows={[
                ["AddKeybindMode:IsActive()", "Always mode reports active while held"],
                ["AddKeybindMode:SetMode()", "Resets latched/held state"],
                ["AddToggleKeybind", "Visible in KeybindList"],
                ["AddKeybind:Set(invalid)", "Silently ignored (was: crash)"],
                ["DynamicProfile.setEnabled(false)", "Actually disconnects Heartbeat"],
                ["saveConfig()", "Debounced 120 ms + AsyncIO"],
                ["Notifications (desktop)", "Bottom-right stack"],
                ["Lazy loading", "Init() no longer loads everything"],
              ]}
            />
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="scroll-mt-8">
            <SectionTitle>Troubleshooting</SectionTitle>
            <div className="space-y-3">
              {(
                [
                  [
                    "config persistence disabled",
                    'Executor lacks writefile/readfile/isfile. UI works; settings do not persist. Check NonameUI:HasFeature("hasWriteFile").',
                  ],
                  [
                    "[Signal] attempt to call nil",
                    "A nil or non-function was passed to :Connect(). Verify callbacks are functions.",
                  ],
                  [
                    "Notifications do not appear",
                    "window._notifyHolder must be set and Notifications.install(window, actx) called inside CreateWindow.",
                  ],
                  [
                    "Dropdown opens below the screen",
                    "v1.16.0 includes popup repositioning. If it persists, verify _markPopupDirty fires on scroll/resize.",
                  ],
                  [
                    "ScrollingFrame passed to PageLayout JumpTo",
                    "Deferred selectTab fired after window:Destroy(). Guarded in v1.16.0 — update to the latest bundle.",
                  ],
                  [
                    "[NonameUI/lazy] Failed to load '…'",
                    "A lazy module path is missing from the bundle. Rebuild with build.js and verify the source file exists.",
                  ],
                ] as const
              ).map(([title, body]) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#252530] bg-[#101017] p-4"
                >
                  <h3 className="mb-1 font-mono text-sm font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9695a8]">{body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Changelog */}
          <section id="changelog" className="scroll-mt-8">
            <SectionTitle>Changelog — v1.16.0</SectionTitle>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#9695a8]">
              <li>Lazy loading for 13/26 modules (Windows, Containers, Notifications, Search, all elements).</li>
              <li>Shared KeybindDispatch — O(k) per keystroke.</li>
              <li>saveConfig 120 ms debounce + AsyncIO; CRC + .bak/.bak2.</li>
              <li>Search 60 ms debounce + pooled result buttons.</li>
              <li>Dropdown virtualized list, persistent handlers, autocomplete.</li>
              <li>Diff-based theme apply — unchanged slots skip tween.</li>
              <li>DynamicProfile disconnects Heartbeat when disabled.</li>
              <li>Notifications stack bottom-right on desktop, top-right on mobile.</li>
              <li>Watermark rework: color-coded FPS/ping, uptime, <code>GetStats()</code>.</li>
              <li>Fixes: KeybindMode state, ToggleKeybind in KeybindList, invalid keybind no-op, AddSlider min/max warning.</li>
              <li>Config tag unchanged: <code>V-1.15.0</code>.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}