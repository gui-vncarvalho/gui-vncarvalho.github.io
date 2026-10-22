export const TYPE_SPEED = 34;
const START = 0.9;
const LINE_GAP = 0.12;

const C = {
  yellow: 'oklch(0.9 0.17 100)',
  white: '#fbf9ff',
  fn: 'oklch(0.8 0.13 295)',
  punct: 'oklch(0.72 0.06 295)',
  comment: 'oklch(0.62 0.05 295)',
};

const KEYWORDS = /^(class|extends|public|function|return|const|lang|setup|script|new)$/;
const TOKEN = /(\/\/.*$|'[^']*'|"[^"]*"|\$\w+|\w+(?=\()|\w+|[{}()[\];,.=>:<\/]+|\s+|.)/g;
const PUNCT = /^[{}()[\];,.=>:<\/]+$/;

function tokenize(line: string, override?: string) {
  return [...line.matchAll(TOKEN)].map(({ 0: t, index }) => {
    let color = C.white;
    if (override) color = override;
    else if (t.startsWith('//')) color = C.comment;
    else if (/^['"]/.test(t) || KEYWORDS.test(t)) color = C.yellow;
    else if (/^\w+$/.test(t) && line[index + t.length] === '(') color = C.fn;
    else if (PUNCT.test(t)) color = C.punct;
    return { t, color };
  });
}

const panes = [
  {
    file: 'WebhookController.php',
    x: 0,
    y: 30,
    w: 470,
    z: -110,
    lines: [
      'class WebhookController extends Controller',
      '{',
      '    public function handle(Request $request)',
      '    {',
      '        $event = $this->gateway->verify($request);',
      '        $this->payments->reconcile($event);',
      "        return response()->json(['ok' => true]);",
      '    }',
      '}',
    ],
  },
  {
    file: 'EnrollmentCard.vue',
    x: 150,
    y: 235,
    w: 470,
    z: 0,
    lines: [
      '<script setup lang="ts">',
      'const props = defineProps<{ tenant: Tenant }>()',
      'const status = computed(() =>',
      "  props.tenant.active ? 'live' : 'paused')",
      '</script>',
    ],
  },
  {
    file: 'terminal',
    x: 40,
    y: 410,
    w: 410,
    z: 110,
    lines: ['$ git push origin main', '✓ build passed', '✓ deployed to production'],
    accent: [false, true, true],
  },
];

let clock = START;

export const codePanes = panes.map((pane) => ({
  ...pane,
  lines: pane.lines.map((text, i) => {
    const line = { start: clock, len: text.length, tokens: tokenize(text, pane.accent?.[i] ? C.yellow : undefined) };
    clock += text.length / TYPE_SPEED + LINE_GAP;
    return line;
  }),
}));

export const floats = [
  { g: '{ }', x: 470, y: 10, s: 92, fs: 38, bg: C.yellow, fg: 'oklch(0.2 0.08 295)' },
  { g: '</>', x: -30, y: 330, s: 84, fs: 30, bg: 'oklch(0.52 0.2 295)', fg: C.white },
  { g: '=>', x: 500, y: 330, s: 74, fs: 30, bg: C.white, fg: 'oklch(0.2 0.08 295)' },
  { g: ';', x: 420, y: 500, s: 64, fs: 34, bg: 'oklch(0.26 0.09 295)', fg: C.yellow },
];
