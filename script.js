const TOTAL_CRISIS_COUNT = 8;
const START_TIME = 300;
const START_HEAT = 24;
const MAX_MISTAKES = 4;
const SUCCESS_STABILITY_FACTOR = 0.65;
const FINAL_REVEAL_DELAY = 1100;
const MENU_STATS_KEY = "atomik_alarm_operator_stats_v1";
const TUTORIAL_STATS_KEY = "atomik_alarm_tutorial_v1";

const difficultyPresets = {
  kolay: {
    label: "Kolay",
    time: 340,
    crisisCount: 7,
    maxMistakes: 5,
    scanMin: 3,
    scanMax: 8,
    stabilityDrainEvery: 28,
    heatRiseEvery: 9,
    heatRiseAmount: 1,
    coolingFactor: 1,
    warmPenalty: 1,
    criticalPenalty: 2,
    noiseMin: 30,
    noiseMax: 46,
    criticalMin: 1,
    criticalMax: 2,
    elevatedCount: 1,
    lockMin: 0,
    lockMax: 1,
    safeBandMin: 26,
    safeBandMax: 30,
    safeBandWidthMin: 16,
    safeBandWidthMax: 19,
    timedChance: 0.18,
    timedMin: 18,
    timedMax: 22,
    ignorePenalty: -40,
    utilities: { coolant: 3, intel: 3, shield: 1, stasis: 1 },
  },
  standart: {
    label: "Standart",
    time: START_TIME,
    crisisCount: TOTAL_CRISIS_COUNT,
    maxMistakes: MAX_MISTAKES,
    scanMin: 3,
    scanMax: 10,
    stabilityDrainEvery: 20,
    heatRiseEvery: 5,
    heatRiseAmount: 1.28,
    coolingFactor: 0.88,
    warmPenalty: 2,
    criticalPenalty: 3,
    noiseMin: 24,
    noiseMax: 40,
    criticalMin: 1,
    criticalMax: 3,
    elevatedCount: 2,
    lockMin: 1,
    lockMax: 2,
    safeBandMin: 27,
    safeBandMax: 31,
    safeBandWidthMin: 12,
    safeBandWidthMax: 15,
    timedChance: 0.24,
    timedMin: 15,
    timedMax: 19,
    ignorePenalty: -50,
    utilities: { coolant: 2, intel: 2, shield: 1, stasis: 1 },
  },
  kritik: {
    label: "Kritik",
    time: 255,
    crisisCount: 9,
    maxMistakes: 3,
    scanMin: 4,
    scanMax: 10,
    stabilityDrainEvery: 14,
    heatRiseEvery: 3,
    heatRiseAmount: 1.6,
    coolingFactor: 0.78,
    warmPenalty: 2,
    criticalPenalty: 4,
    noiseMin: 18,
    noiseMax: 32,
    criticalMin: 2,
    criticalMax: 3,
    elevatedCount: 3,
    lockMin: 2,
    lockMax: 3,
    safeBandMin: 29,
    safeBandMax: 32,
    safeBandWidthMin: 9,
    safeBandWidthMax: 11,
    timedChance: 0.32,
    timedMin: 12,
    timedMax: 16,
    ignorePenalty: -60,
    utilities: { coolant: 1, intel: 1, shield: 1, stasis: 0 },
  },
};

const atoms = [
  { symbol: "N", name: "Azot", number: 7 },
  { symbol: "O", name: "Oksijen", number: 8 },
  { symbol: "F", name: "Flor", number: 9 },
  { symbol: "Ne", name: "Neon", number: 10 },
  { symbol: "Na", name: "Sodyum", number: 11 },
  { symbol: "Mg", name: "Magnezyum", number: 12 },
  { symbol: "Al", name: "Alüminyum", number: 13 },
  { symbol: "P", name: "Fosfor", number: 15 },
  { symbol: "S", name: "Kükürt", number: 16 },
  { symbol: "Cl", name: "Klor", number: 17 },
  { symbol: "Ar", name: "Argon", number: 18 },
  { symbol: "K", name: "Potasyum", number: 19 },
  { symbol: "Ca", name: "Kalsiyum", number: 20 },
  { symbol: "Cr", name: "Krom", number: 24 },
  { symbol: "Mn", name: "Mangan", number: 25 },
  { symbol: "Fe", name: "Demir", number: 26 },
  { symbol: "Cu", name: "Bakır", number: 29 },
];

const orbitalFlow = [
  { label: "1s", capacity: 2, n: 1 },
  { label: "2s", capacity: 2, n: 2 },
  { label: "2p", capacity: 6, n: 2 },
  { label: "3s", capacity: 2, n: 3 },
  { label: "3p", capacity: 6, n: 3 },
  { label: "4s", capacity: 2, n: 4 },
  { label: "3d", capacity: 10, n: 3 },
  { label: "4p", capacity: 6, n: 4 },
];

const shellLabels = ["K", "L", "M", "N"];
const clockFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const roots = [
  { key: "oh", display: "OH", formula: "OH⁻", name: "Hidroksit", charge: "-1", valency: "1", kind: "kök", note: "Bazik kök olarak sık görülür." },
  { key: "f", display: "F", formula: "F⁻", name: "Florür", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli halojen köküdür." },
  { key: "cl", display: "Cl", formula: "Cl⁻", name: "Klorür", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli halojen köküdür." },
  { key: "br", display: "Br", formula: "Br⁻", name: "Bromür", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli halojen köküdür." },
  { key: "i", display: "I", formula: "I⁻", name: "İyodür", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli halojen köküdür." },
  { key: "s", display: "S", formula: "S²⁻", name: "Sülfür", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli basit anyondur." },
  { key: "no3", display: "NO₃", formula: "NO₃⁻", name: "Nitrat", charge: "-1", valency: "1", kind: "kök", note: "Asit kökü olarak tek değerlikli davranır." },
  { key: "no2", display: "NO₂", formula: "NO₂⁻", name: "Nitrit", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli negatif köktür." },
  { key: "so4", display: "SO₄", formula: "SO₄²⁻", name: "Sülfat", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli negatif köktür." },
  { key: "so3", display: "SO₃", formula: "SO₃²⁻", name: "Sülfit", charge: "-2", valency: "2", kind: "kök", note: "Sülfatla karıştırılabilir; iki değerliklidir." },
  { key: "hso4", display: "HSO₄", formula: "HSO₄⁻", name: "Hidrojen Sülfat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli asit köküdür." },
  { key: "hso3", display: "HSO₃", formula: "HSO₃⁻", name: "Hidrojen Sülfit", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli asit köküdür." },
  { key: "co3", display: "CO₃", formula: "CO₃²⁻", name: "Karbonat", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli kök örneğidir." },
  { key: "hco3", display: "HCO₃", formula: "HCO₃⁻", name: "Hidrojen Karbonat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli asit kökü olarak geçer." },
  { key: "po4", display: "PO₄", formula: "PO₄³⁻", name: "Fosfat", charge: "-3", valency: "3", kind: "kök", note: "Üç değerlikli negatif köktür." },
  { key: "hpo4", display: "HPO₄", formula: "HPO₄²⁻", name: "Hidrojen Fosfat", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli asit köküdür." },
  { key: "h2po4", display: "H₂PO₄", formula: "H₂PO₄⁻", name: "Dihidrojen Fosfat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli asit köküdür." },
  { key: "nh4", display: "NH₄", formula: "NH₄⁺", name: "Amonyum", charge: "+1", valency: "1", kind: "kök", note: "Pozitif çok atomlu iyondur." },
  { key: "cn", display: "CN", formula: "CN⁻", name: "Siyanür", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli negatif köktür." },
  { key: "ch3coo", display: "CH₃COO", formula: "CH₃COO⁻", name: "Asetat", charge: "-1", valency: "1", kind: "kök", note: "Organik kök olarak sık görülür." },
  { key: "mno4", display: "MnO₄", formula: "MnO₄⁻", name: "Permanganat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli güçlü oksitleyici köktür." },
  { key: "cro4", display: "CrO₄", formula: "CrO₄²⁻", name: "Kromat", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli krom köküdür." },
  { key: "cr2o7", display: "Cr₂O₇", formula: "Cr₂O₇²⁻", name: "Dikromat", charge: "-2", valency: "2", kind: "kök", note: "İki değerlikli çok atomlu iyondur." },
  { key: "clo", display: "ClO", formula: "ClO⁻", name: "Hipoklorit", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli klor oksianyonudur." },
  { key: "clo2", display: "ClO₂", formula: "ClO₂⁻", name: "Klorit", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli klor oksianyonudur." },
  { key: "clo3", display: "ClO₃", formula: "ClO₃⁻", name: "Klorat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli klor oksianyonudur." },
  { key: "clo4", display: "ClO₄", formula: "ClO₄⁻", name: "Perklorat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli klor oksianyonudur." },
  { key: "bro3", display: "BrO₃", formula: "BrO₃⁻", name: "Bromat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli brom oksianyonudur." },
  { key: "io3", display: "IO₃", formula: "IO₃⁻", name: "İyodat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli iyot oksianyonudur." },
  { key: "scn", display: "SCN", formula: "SCN⁻", name: "Tiyosiyanat", charge: "-1", valency: "1", kind: "kök", note: "Tek değerlikli kompleks köktür." },
  { key: "hcl", display: "HCl", formula: "HCl", name: "Hidroklorik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asit davranışı verir." },
  { key: "hf", display: "HF", formula: "HF", name: "Hidroflorik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hbr", display: "HBr", formula: "HBr", name: "Hidrobromik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hi", display: "HI", formula: "HI", name: "Hidroiyodik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hno2", display: "HNO₂", formula: "HNO₂", name: "Nitröz Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hno3", display: "HNO₃", formula: "HNO₃", name: "Nitrik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hclo", display: "HClO", formula: "HClO", name: "Hipokloröz Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hclo2", display: "HClO₂", formula: "HClO₂", name: "Kloröz Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hclo3", display: "HClO₃", formula: "HClO₃", name: "Klorik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "hclo4", display: "HClO₄", formula: "HClO₄", name: "Perklorik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asittir." },
  { key: "h2so4", display: "H₂SO₄", formula: "H₂SO₄", name: "Sülfürik Asit", charge: "0", valency: "2", kind: "asit", note: "Nötr asit formunda gösterilir; iki değerlikli asittir." },
  { key: "h2so3", display: "H₂SO₃", formula: "H₂SO₃", name: "Sülfüroz Asit", charge: "0", valency: "2", kind: "asit", note: "Nötr asit formunda gösterilir; iki değerlikli asittir." },
  { key: "h2s", display: "H₂S", formula: "H₂S", name: "Hidrosülfürik Asit", charge: "0", valency: "2", kind: "asit", note: "Nötr asit formunda gösterilir; iki değerlikli asit davranışı gösterir." },
  { key: "h2co3", display: "H₂CO₃", formula: "H₂CO₃", name: "Karbonik Asit", charge: "0", valency: "2", kind: "asit", note: "Nötr asit formunda gösterilir; iki değerlikli asittir." },
  { key: "h3po4", display: "H₃PO₄", formula: "H₃PO₄", name: "Fosforik Asit", charge: "0", valency: "3", kind: "asit", note: "Nötr asit formunda gösterilir; üç değerlikli asittir." },
  { key: "ch3cooh", display: "CH₃COOH", formula: "CH₃COOH", name: "Asetik Asit", charge: "0", valency: "1", kind: "asit", note: "Nötr asit formunda gösterilir; tek değerlikli asit davranışı verir." },
];

const notesPages = [
  {
    summary: "terminal fiilleri ve ne işe yaradıkları",
    title: "Sayfa 1 // Komut Defteri",
    body: `
      <p>Terminal rastgele kelime beklemez. Çoğu kriz bu fiillerin birinden çözüm bekler.</p>
      <ul>
        <li><strong>yardım</strong>: terminal fiillerini listeler.</li>
        <li><strong>notlar</strong>: operatör notlarını açar.</li>
        <li><strong>tarama</strong>: atom tarama panelini açar.</li>
        <li><strong>tarama na</strong> veya <strong>tarama o -2</strong>: atom taramasını doğrudan terminalden başlatır.</li>
        <li><strong>tarama kok oh</strong>: çok atomlu kök taramasını açar.</li>
        <li><strong>durum</strong>: mevcut süre ve stabiliteyi verir.</li>
        <li><strong>yönlendir [hedef]</strong>: elektronu yazdığın hedef orbital hattına taşır. Hedef çoğu zaman tam etiket olur: <strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p</strong>.</li>
        <li><strong>etiketle [hedef]</strong>: yanlış orbital etiketini yazdığın hedefle değiştirir. Örnek: <strong>etiketle 2s</strong>, <strong>etiketle 3p</strong>.</li>
        <li><strong>kartı-reddet</strong>: geçersiz kuantum kartını yok sayar.</li>
        <li><strong>kartı-kabul-et</strong>: fiziksel olarak geçerli kuantum kartını sisteme alır.</li>
      </ul>
      <p><strong>Ne zaman hangisi?</strong></p>
      <ul>
        <li>Bir elektron yanlış hatta gidiyorsa çoğu zaman <strong>yönlendir</strong> gerekir.</li>
        <li>Yanlış yazılmış bir orbital türü varsa <strong>etiketle</strong> daha uygundur.</li>
        <li>Kartın kendisi fiziksel olarak bozuksa <strong>kartı-reddet</strong> gerekir.</li>
        <li>Kart değerleri tutarlıysa refleksle reddetme; bu kez <strong>kartı-kabul-et</strong> gerekir.</li>
      </ul>
      <span class="note-scribble">komutları ezberlemekten çok hangi fiilin hangi tür probleme uyduğunu anlamak daha önemli.</span>
    `,
  },
  {
    summary: "yardımcı sistemler ne yapar, ne yapmaz",
    title: "Sayfa 2 // Yardımcı Sistemler",
    body: `
      <p>Bu sistemler teşhis yerine geçmez; yalnızca süre, dayanım ya da ek kayıt kazandırır.</p>
      <ul>
        <li><strong>Acil Soğutma</strong>: ısı yükünü kısa süreli bastırır; işlem süresi yaratır.</li>
        <li><strong>Derin Tanı</strong>: açık pakete ek bir veri kartı düşürür.</li>
        <li><strong>Yedek Sigorta</strong>: bir sonraki ağır darbeyi emer.</li>
        <li><strong>Alan Sabitleme</strong>: akışı kısa süre dondurur; baskı anında karar aralığı açar.</li>
      </ul>
      <span class="note-scribble">yardımcı sistemler müdahalenin yerini tutmaz; yalnızca hatayı pahalıya çevirmemeye yarar.</span>
    `,
  },
  {
    summary: "sorun olmayan durumlar da olabilir",
    title: "Sayfa 3 // Kriz Disiplini",
    body: `
      <p>Her kırmızı ekran gerçek arıza değildir. Bazı durumlar sadece değerlendirme ister.</p>
      <ul>
        <li>Bazı paketlerde doğru cevap “müdahale etme” olabilir.</li>
        <li>Önce belirtiye bak, sonra eylem seç.</li>
        <li>Her veri gürültüsünü arıza sanma.</li>
        <li>Doğru cevap bazen “şu an sorun yok” demektir; yine de veriye dayanmalıdır.</li>
      </ul>
    `,
  },
  {
    summary: "konu zinciri ve kapanış sırası",
    title: "Sayfa 4 // Kapanış Sırası",
    body: `
      <p>Tur sonunda çekirdek, modülleri doğru sırayla yeniden kilitlemeni ister.</p>
      <ul>
        <li><strong>Kuantum Modeli</strong></li>
        <li><strong>Orbital ve Kuantum Sayıları</strong></li>
        <li><strong>Elektron Dizilimi</strong></li>
        <li><strong>Periyodik Yer ve Özellik</strong></li>
        <li><strong>Yükseltgenme Basamağı</strong></li>
      </ul>
    `,
  },
  {
    summary: "aufbau ve orbital akış sırası",
    title: "Sayfa 5 // Enerji Akışı",
    body: `
      <p>Elektronlar düşük enerji basamaklarını tamamlamadan üst basamağa keyfi sıçramaz.</p>
      <ul>
        <li>1s - 2s - 2p - 3s - 3p akışı sık döner.</li>
        <li>Yanlış sıralama doğrudan kararsızlık üretir.</li>
      </ul>
    `,
  },
  {
    summary: "pauli, hund ve kutu mantığı",
    title: "Sayfa 6 // Orbital Kutuları",
    body: `
      <p>Kutu düşünmek çoğu p-orbital krizini hızlandırır.</p>
      <ul>
        <li>Aynı kutu: en fazla iki elektron ve zıt spin.</li>
        <li>Eş enerjili kutular: önce tek tek dolma eğilimi.</li>
        <li>Kutu modülünde seçimler <strong>∅</strong>, <strong>↑</strong> ve <strong>↑↓</strong> olarak görünür.</li>
      </ul>
      <span class="note-scribble">önce dağıt, sonra eşleştir.</span>
    `,
  },
  {
    summary: "kuantum sayılarıyla etiketi doğrulama",
    title: "Sayfa 7 // Kuantum Kartları",
    body: `
      <p>Kart verisi bozuksa sistemi zorlamanın anlamı yok.</p>
      <ul>
        <li><strong>n</strong>: baş kuantum sayısı, enerji düzeyi bilgisidir.</li>
        <li><strong>l</strong>: orbital türünü veren kuantum sayısıdır.</li>
        <li><strong>m<sub>l</sub></strong>: manyetik kuantum sayısıdır; aynı alt düzeydeki yönelimleri ayırır.</li>
        <li><strong>m<sub>s</sub></strong>: spin kuantum sayısıdır.</li>
        <li><strong>l = 0 -> s</strong>, <strong>1 -> p</strong>, <strong>2 -> d</strong>, <strong>3 -> f</strong>.</li>
        <li>Her n değeri her l türünü açmaz.</li>
        <li>Yanlış kart reddedilir, tutarlı kart kabul edilir.</li>
      </ul>
    `,
  },
  {
    summary: "iyonlar ve alan geometrisi",
    title: "Sayfa 8 // İyon Notları",
    body: `
      <p>Proton aynı kalırken elektron sayısı değişirse alan geometrisi değişebilir.</p>
      <ul>
        <li>Katyon: genelde daha küçük.</li>
        <li>Anyon: genelde daha büyük.</li>
        <li>“Aynı tür” ile “aynı boyut” aynı şey değil.</li>
      </ul>
    `,
  },
  {
    summary: "elektron koparma enerjisi sezgisi",
    title: "Sayfa 9 // Koparma Gücü",
    body: `
      <p>Her atoma aynı güç gönderilmez.</p>
      <ul>
        <li>Dış elektron daha gevşekse koparmak daha kolay olabilir.</li>
        <li>Daha kararlı düzen daha fazla direnç gösterebilir.</li>
      </ul>
      <span class="note-scribble">“tek eşik” politikası genelde sorun çıkarır.</span>
    `,
  },
  {
    summary: "arayüz hissi ve hayatta kalma mantığı",
    title: "Sayfa 10 // Saha Davranışı",
    body: `
      <p>Kontrol odasında veri kaynağı ile müdahale alanını aynı anda okumak gerekir.</p>
      <ul>
        <li>Önce veri kartlarını oku, sonra karar alanına geç.</li>
        <li>Sıcaklık yükselirse bazı paneller çevrim dışı kalabilir.</li>
        <li>Stabilite düşüyorsa yanlış müdahale kaydı birikiyor demektir.</li>
      </ul>
    `,
  },
  {
    summary: "tarama kilidi ve yeni paneller",
    title: "Sayfa 11 // Operasyon İpuçları",
    body: `
      <p>Bazı paketlerde karar öncesi doğrulama istenir; veri çekmeden müdahale açılmaz.</p>
      <ul>
        <li><strong>Tarama şartı</strong>: ilgili türü görmeden karar vermen istenmeyebilir.</li>
        <li><strong>Panel taraması</strong>: yan sistemden atom ya da kök seçip taramayı başlatabilirsin.</li>
        <li><strong>Terminal taraması</strong>: <strong>tarama na</strong>, <strong>tarama kok oh</strong> ya da <strong>tarama cl -1</strong> gibi komutlar kabul edilir.</li>
        <li><strong>Kilit olayları</strong>: bazı krizlerde ekran kısa süreli kapanır; ipucu çoğu zaman temel bir kurala, kuantum etiketine ya da bir bilim insanına gider.</li>
      </ul>
      <span class="note-scribble">veri gelmeden verilen karar, çoğu zaman yanlış karardan daha pahalıdır.</span>
    `,
  },
];

const ambientMessages = [
  "soğutma halkasında kısa gecikme görüldü",
  "spektrometre dar bantta parazit aldı",
  "yardımcı işlemci veri toparlıyor",
  "çekirdek camında iyon izi parladı",
  "yük kapısında küçük sapma kaydedildi",
  "arka panelde geçici manyetik titreme oluştu",
  "gama sayacı tek atımlık pik verdi",
];

const state = {
  active: false,
  timeLeft: START_TIME,
  stability: 100,
  heat: START_HEAT,
  safeBand: { min: 28, max: 42 },
  difficulty: "standart",
  currentIndex: -1,
  runId: "",
  tutorialMode: false,
  tutorialGuide: {
    active: false,
    steps: [],
    index: -1,
    focused: [],
  },
  crises: [],
  currentCrisis: null,
  timerId: null,
  scanTimeoutId: null,
  scanTickId: null,
  scanBusy: false,
  attempts: 0,
  notesPage: 0,
  terminalLines: [],
  sequence: {
    selected: [],
  },
  classify: [],
  classifyReview: [],
  threatLevel: "",
  boxState: [],
  boxReview: [],
  assignSelections: [],
  assignReview: [],
  multiSelections: [],
  compareSelections: [],
  stepperValues: [],
  tablePickSelection: -1,
  matrixSelections: [],
  freezeTicks: 0,
  stabilityDrainTick: 0,
  heatRiseTick: 0,
  noiseCountdown: 0,
  booting: false,
  ending: false,
  endQueued: false,
  utilities: {
    coolant: 2,
    intel: 2,
    shield: 1,
    stasis: 1,
    shieldArmed: false,
  },
  mistakes: [],
  scanMode: "single",
  lockEvent: null,
  noiseEvent: null,
  noiseMotionId: null,
  devPaused: false,
  warningCueSecond: null,
  heartbeatCueSecond: null,
  timedCueSecond: null,
  lastHeatCrackleAt: 0,
  lastNoiseResolveAt: 0,
  coolingActive: false,
  coolingIntervalId: null,
  interactionBaseLabel: "",
  crisisResolved: false,
  runStartedAt: null,
  runFinishedAt: null,
  runPersisted: false,
  stats: {
    successCount: 0,
    scanCount: 0,
    utilityCount: 0,
    noiseCount: 0,
    lockCount: 0,
    maxHeat: START_HEAT,
  },
};

const els = {
  timeValue: document.getElementById("timeValue"),
  timeCard: document.getElementById("timeValue").closest(".hud-card"),
  stabilityValue: document.getElementById("stabilityValue"),
  stabilityCard: document.getElementById("stabilityValue").closest(".hud-card"),
  heatValue: document.getElementById("heatValue"),
  heatCard: document.getElementById("heatValue").closest(".hud-card"),
  crisisValue: document.getElementById("crisisValue"),
  seedValue: document.getElementById("seedValue"),
  stabilityFill: document.getElementById("stabilityFill"),
  stabilityStrip: document.querySelector(".stability-strip"),
  alarmBadge: document.getElementById("alarmBadge"),
  crisisTitle: document.getElementById("crisisTitle"),
  crisisText: document.getElementById("crisisText"),
  evidenceBoard: document.getElementById("evidenceBoard"),
  interactionType: document.getElementById("interactionType"),
  terminalFeed: document.getElementById("terminalFeed"),
  commandArea: document.getElementById("commandArea"),
  commandInput: document.getElementById("commandInput"),
  commandSubmit: document.getElementById("commandSubmit"),
  actionArea: document.getElementById("actionArea"),
  sequenceArea: document.getElementById("sequenceArea"),
  sequenceCurrent: document.getElementById("sequenceCurrent"),
  sequenceBank: document.getElementById("sequenceBank"),
  sequenceReset: document.getElementById("sequenceReset"),
  sequenceSubmit: document.getElementById("sequenceSubmit"),
  classifyArea: document.getElementById("classifyArea"),
  classifyList: document.getElementById("classifyList"),
  classifyReset: document.getElementById("classifyReset"),
  classifySubmit: document.getElementById("classifySubmit"),
  threatArea: document.getElementById("threatArea"),
  threatChoices: [...document.querySelectorAll(".threat-button")],
  threatReadout: document.getElementById("threatReadout"),
  threatSubmit: document.getElementById("threatSubmit"),
  boxArea: document.getElementById("boxArea"),
  boxGrid: document.getElementById("boxGrid"),
  boxReadout: document.getElementById("boxReadout"),
  boxReset: document.getElementById("boxReset"),
  boxSubmit: document.getElementById("boxSubmit"),
  assignArea: document.getElementById("assignArea"),
  assignList: document.getElementById("assignList"),
  assignReset: document.getElementById("assignReset"),
  assignSubmit: document.getElementById("assignSubmit"),
  multiArea: document.getElementById("multiArea"),
  multiReadout: document.getElementById("multiReadout"),
  multiList: document.getElementById("multiList"),
  multiReset: document.getElementById("multiReset"),
  multiSubmit: document.getElementById("multiSubmit"),
  compareArea: document.getElementById("compareArea"),
  compareReadout: document.getElementById("compareReadout"),
  compareList: document.getElementById("compareList"),
  compareReset: document.getElementById("compareReset"),
  compareSubmit: document.getElementById("compareSubmit"),
  stepperArea: document.getElementById("stepperArea"),
  stepperReadout: document.getElementById("stepperReadout"),
  stepperList: document.getElementById("stepperList"),
  stepperReset: document.getElementById("stepperReset"),
  stepperSubmit: document.getElementById("stepperSubmit"),
  tablePickArea: document.getElementById("tablePickArea"),
  tablePickReadout: document.getElementById("tablePickReadout"),
  tablePickBoard: document.getElementById("tablePickBoard"),
  tablePickSubmit: document.getElementById("tablePickSubmit"),
  matrixArea: document.getElementById("matrixArea"),
  matrixReadout: document.getElementById("matrixReadout"),
  matrixBoard: document.getElementById("matrixBoard"),
  matrixReset: document.getElementById("matrixReset"),
  matrixSubmit: document.getElementById("matrixSubmit"),
  verdictBox: document.getElementById("verdictBox"),
  verdictTitle: document.getElementById("verdictTitle"),
  verdictText: document.getElementById("verdictText"),
  taskNoticeBox: document.getElementById("taskNoticeBox"),
  taskNoticeTitle: document.getElementById("taskNoticeTitle"),
  taskNoticeText: document.getElementById("taskNoticeText"),
  ignoreButton: document.getElementById("ignoreButton"),
  openScanner: document.getElementById("openScanner"),
  openCooling: document.getElementById("openCooling"),
  openNotes: document.getElementById("openNotes"),
  audioToggle: document.getElementById("audioToggle"),
  audioStatus: document.getElementById("audioStatus"),
  musicToggle: document.getElementById("musicToggle"),
  musicStatus: document.getElementById("musicStatus"),
  coolantButton: document.getElementById("coolantButton"),
  intelButton: document.getElementById("intelButton"),
  shieldButton: document.getElementById("shieldButton"),
  stasisButton: document.getElementById("stasisButton"),
  coolantCount: document.getElementById("coolantCount"),
  intelCount: document.getElementById("intelCount"),
  shieldCount: document.getElementById("shieldCount"),
  stasisCount: document.getElementById("stasisCount"),
  startOverlay: document.getElementById("startOverlay"),
  startButton: document.getElementById("startButton"),
  startButtonKicker: document.getElementById("startButtonKicker"),
  startButtonLabel: document.getElementById("startButtonLabel"),
  tutorialGuide: document.getElementById("tutorialGuide"),
  tutorialGuideTag: document.getElementById("tutorialGuideTag"),
  tutorialGuideStep: document.getElementById("tutorialGuideStep"),
  tutorialGuideTitle: document.getElementById("tutorialGuideTitle"),
  tutorialGuideText: document.getElementById("tutorialGuideText"),
  tutorialGuideHint: document.getElementById("tutorialGuideHint"),
  tutorialGuideNext: document.getElementById("tutorialGuideNext"),
  difficultyButtons: [...document.querySelectorAll(".difficulty-card")],
  introCrisisLabel: document.getElementById("introCrisisLabel"),
  introAlertLabel: document.getElementById("introAlertLabel"),
  introScanLabel: document.getElementById("introScanLabel"),
  introCrisisCount: document.getElementById("introCrisisCount"),
  introAlertRange: document.getElementById("introAlertRange"),
  introScanRange: document.getElementById("introScanRange"),
  introHistoryTitle: document.getElementById("introHistoryTitle"),
  introRunsAvg: document.getElementById("introRunsAvg"),
  introWinRateAvg: document.getElementById("introWinRateAvg"),
  introDurationAvg: document.getElementById("introDurationAvg"),
  introMistakeAvg: document.getElementById("introMistakeAvg"),
  introScanAvg: document.getElementById("introScanAvg"),
  introBestTime: document.getElementById("introBestTime"),
  bootOverlay: document.getElementById("bootOverlay"),
  bootPanel: document.getElementById("bootPanel"),
  bootTag: document.getElementById("bootTag"),
  bootTitle: document.getElementById("bootTitle"),
  bootFeed: document.getElementById("bootFeed"),
  bootStatus: document.getElementById("bootStatus"),
  bootProgressFill: document.getElementById("bootProgressFill"),
  hudStats: document.querySelector(".hud-stats"),
  reactorPanel: document.querySelector(".reactor-panel"),
  dockPanel: document.querySelector(".dock-panel"),
  scannerOverlay: document.getElementById("scannerOverlay"),
  closeScanner: document.getElementById("closeScanner"),
  scanModeButtons: [...document.querySelectorAll(".scan-modes .mode-button")],
  scanTargetLabel: document.getElementById("scanTargetLabel"),
  scanAtomA: document.getElementById("scanAtomA"),
  scanCharge: document.getElementById("scanCharge"),
  scanChargeField: document.getElementById("scanChargeField"),
  scanButton: document.getElementById("scanButton"),
  scanMeta: document.getElementById("scanMeta"),
  scanOutput: document.getElementById("scanOutput"),
  coolingOverlay: document.getElementById("coolingOverlay"),
  closeCooling: document.getElementById("closeCooling"),
  coolingSafeBand: document.getElementById("coolingSafeBand"),
  coolingSafeLabel: document.getElementById("coolingSafeLabel"),
  coolingFill: document.getElementById("coolingFill"),
  coolingNeedle: document.getElementById("coolingNeedle"),
  coolingText: document.getElementById("coolingText"),
  coolingStatus: document.getElementById("coolingStatus"),
  coolingHold: document.getElementById("coolingHold"),
  notesOverlay: document.getElementById("notesOverlay"),
  closeNotes: document.getElementById("closeNotes"),
  notesTitle: document.getElementById("notesTitle"),
  notesSidebar: document.getElementById("notesSidebar"),
  notesPaper: document.getElementById("notesPaper"),
  notesPageLabel: document.getElementById("notesPageLabel"),
  prevNote: document.getElementById("prevNote"),
  nextNote: document.getElementById("nextNote"),
  lockOverlay: document.getElementById("lockOverlay"),
  lockTitle: document.getElementById("lockTitle"),
  lockText: document.getElementById("lockText"),
  lockHint: document.getElementById("lockHint"),
  lockInput: document.getElementById("lockInput"),
  lockSubmit: document.getElementById("lockSubmit"),
  noiseOverlay: document.getElementById("noiseOverlay"),
  noisePanel: document.getElementById("noisePanel"),
  noiseTag: document.getElementById("noiseTag"),
  noiseTitle: document.getElementById("noiseTitle"),
  noiseText: document.getElementById("noiseText"),
  noiseSteps: document.getElementById("noiseSteps"),
  noiseReadout: document.getElementById("noiseReadout"),
  noiseTuner: document.getElementById("noiseTuner"),
  noiseWindow: document.getElementById("noiseWindow"),
  noiseCursor: document.getElementById("noiseCursor"),
  noiseMatchArea: document.getElementById("noiseMatchArea"),
  noiseMatchLeft: document.getElementById("noiseMatchLeft"),
  noiseMatchRight: document.getElementById("noiseMatchRight"),
  noiseButton: document.getElementById("noiseButton"),
  outcomeOverlay: document.getElementById("outcomeOverlay"),
  outcomePanel: document.getElementById("outcomePanel"),
  outcomeTag: document.getElementById("outcomeTag"),
  outcomeTitle: document.getElementById("outcomeTitle"),
  outcomeText: document.getElementById("outcomeText"),
  outcomeDetails: document.getElementById("outcomeDetails"),
  menuButton: document.getElementById("menuButton"),
  restartButton: document.getElementById("restartButton"),
};

const audioState = {
  supported: Boolean(window.AudioContext || window.webkitAudioContext),
  context: null,
  master: null,
  musicGain: null,
  fxGain: null,
  ambientBaseGain: null,
  ambientPulseGain: null,
  ambientNoiseGain: null,
  ambientAirGain: null,
  ambientRattleGain: null,
  fireBedGain: null,
  menuPadGain: null,
  menuShineGain: null,
  fireLoop: null,
  ambienceTimer: null,
  alarmTimer: null,
  heatTimer: null,
  systemTimer: null,
  incidentalTimer: null,
  samples: {},
  enabled: true,
  musicEnabled: true,
  mood: "idle",
  primed: false,
  lastLogAt: 0,
  lastTypeAt: 0,
  introPreviewQueued: false,
  introPreviewPlayed: false,
};

function currentDifficulty() {
  if (state.tutorialMode || state.difficulty === "egitim") {
    return difficultyPresets.kolay;
  }
  return difficultyPresets[state.difficulty] || difficultyPresets.standart;
}

function currentSafeBand() {
  return state.safeBand || { min: 28, max: 42 };
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomItem(list) {
  return list.splice(Math.floor(Math.random() * list.length), 1)[0];
}

function generateSafeBand() {
  const preset = currentDifficulty();
  const width = randomInt(preset.safeBandWidthMin, preset.safeBandWidthMax);
  const min = randomInt(preset.safeBandMin, preset.safeBandMax);
  return { min, max: Math.min(69, min + width) };
}

function timedEligible(crisis) {
  if (!crisis || crisis.id === "core-sync-final" || crisis.category === "stable-check") {
    return false;
  }
  if (crisis.scanRequired) {
    return false;
  }
  return ["choice", "classify", "box", "assign", "command", "multi", "compare", "stepper", "tablepick", "matrix"].includes(crisis.mode);
}

function timedPenaltyFor(crisis) {
  if (crisis.severity === "kritik") {
    return -24;
  }
  if (crisis.severity === "yüksek") {
    return -20;
  }
  return -17;
}

function decorateTimedCrisis(crises) {
  const preset = currentDifficulty();
  if (Math.random() > preset.timedChance) {
    return crises;
  }

  const eligible = crises.filter(timedEligible);
  if (eligible.length === 0) {
    return crises;
  }

  const crisis = pick(eligible);
  crisis.timedChallenge = {
    limit: randomInt(preset.timedMin, preset.timedMax),
    remaining: null,
    penalty: timedPenaltyFor(crisis),
    resolved: false,
    expired: false,
  };
  return crises;
}

function currentTimedChallenge() {
  return state.currentCrisis?.timedChallenge || null;
}

function updateInteractionType() {
  const base = state.interactionBaseLabel || "müdahale bekleniyor";
  const timed = currentTimedChallenge();
  if (timed && !timed.resolved && typeof timed.remaining === "number") {
    els.interactionType.textContent = `${base} // ${timed.remaining} sn pencere`;
    return;
  }
  els.interactionType.textContent = base;
}

function mistakeLimit() {
  return currentDifficulty().maxMistakes;
}

function renderDifficultyPicker() {
  const tutorialSelected = state.difficulty === "egitim";
  const preset = tutorialSelected ? difficultyPresets.kolay : currentDifficulty();
  els.difficultyButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.difficulty === state.difficulty);
  });
  if (tutorialSelected) {
    const completed = tutorialCompleted();
    els.introCrisisLabel.textContent = "Eğitim Akışı";
    els.introAlertLabel.textContent = "Rehber Düzeyi";
    els.introScanLabel.textContent = "Tarama Modu";
    els.introCrisisCount.textContent = "3 eğitim paketi";
    els.introAlertRange.textContent = "adım adım";
    els.introScanRange.textContent = "hazır seçim";
    els.startButtonKicker.textContent = completed ? "Rehber Tekrarı" : "İlk Çalışma";
    els.startButtonLabel.textContent = completed ? "Eğitimi Tekrarla" : "Eğitimi Başlat";
  } else {
    els.introCrisisLabel.textContent = "Tur Yapısı";
    els.introAlertLabel.textContent = "Alarm Yoğunluğu";
    els.introScanLabel.textContent = "Tarama Penceresi";
    els.introCrisisCount.textContent = `${preset.crisisCount} kriz + 1 kapanış`;
    els.introAlertRange.textContent = `${preset.criticalMin}-${preset.criticalMax} kritik paket`;
    els.introScanRange.textContent = `${preset.scanMin}-${preset.scanMax} saniye`;
    els.startButtonKicker.textContent = "Çekirdek Devri";
    els.startButtonLabel.textContent = "Çalışmayı Başlat";
  }
  renderMenuStats();
}

function loadMenuStats() {
  try {
    const raw = window.localStorage.getItem(MENU_STATS_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.runs !== "number") {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function saveMenuStats(stats) {
  try {
    window.localStorage.setItem(MENU_STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    // ignore storage errors
  }
}

function renderMenuStats() {
  const stats = loadMenuStats();
  if (!stats || stats.runs <= 0) {
    els.introHistoryTitle.textContent = "Henüz operasyon kaydı yok";
    els.introRunsAvg.textContent = "0";
    els.introWinRateAvg.textContent = "%0";
    els.introDurationAvg.textContent = "--";
    els.introMistakeAvg.textContent = "--";
    els.introScanAvg.textContent = "--";
    els.introBestTime.textContent = "--";
    return;
  }

  const avgDuration = stats.totalDuration / stats.runs;
  const avgMistakes = stats.totalMistakes / stats.runs;
  const avgScans = stats.totalScans / stats.runs;
  const winRate = Math.round((stats.wins / stats.runs) * 100);

  els.introHistoryTitle.textContent =
    stats.wins > 0 ? `${stats.runs} çalışma kaydı işlendi` : "Henüz temiz çıkış kaydı yok";
  els.introRunsAvg.textContent = `${stats.runs}`;
  els.introWinRateAvg.textContent = `%${winRate}`;
  els.introDurationAvg.textContent = formatElapsedLabel(avgDuration);
  els.introMistakeAvg.textContent = avgMistakes.toFixed(1);
  els.introScanAvg.textContent = avgScans.toFixed(1);
  els.introBestTime.textContent = typeof stats.bestTime === "number" ? formatElapsedLabel(stats.bestTime) : "--";
}

function tutorialCompleted() {
  try {
    return window.localStorage.getItem(TUTORIAL_STATS_KEY) === "done";
  } catch (error) {
    return false;
  }
}

function markTutorialCompleted() {
  try {
    window.localStorage.setItem(TUTORIAL_STATS_KEY, "done");
  } catch (error) {
    // ignore storage errors
  }
}

function clearTutorialFocus() {
  (state.tutorialGuide.focused || []).forEach((element) => {
    element.classList.remove("tutorial-focus", "tutorial-soft-focus", "tutorial-locked");
  });
  state.tutorialGuide.focused = [];
  document.body.classList.remove("tutorial-active");
}

function tutorialTargetsFor(key) {
  switch (key) {
    case "hud":
      return [els.hudStats];
    case "reactor":
      return [els.reactorPanel];
    case "choices":
      return [els.reactorPanel];
    case "scanner-button":
      return [els.dockPanel];
    case "scanner-panel":
      return [els.scannerOverlay.querySelector(".overlay-panel")];
    case "scanner-close":
      return [els.scannerOverlay.querySelector(".overlay-panel")];
    case "cooling-button":
      return [els.dockPanel];
    case "notes-button":
      return [els.dockPanel];
    case "alarm":
      return [els.alarmBadge, els.reactorPanel];
    case "command":
      return [els.commandArea];
    case "box":
      return [els.boxArea];
    default:
      return [];
  }
}

function prepareTutorialScannerSelection() {
  if (!state.tutorialMode || state.currentCrisis?.id !== "tutorial-scan-choice") {
    return;
  }
  setScanMode("single");
  if (els.scanAtomA.querySelector('option[value="Na"]')) {
    els.scanAtomA.value = "Na";
  }
}

function tutorialScannerCloseLocked() {
  if (!state.tutorialMode || state.currentCrisis?.id !== "tutorial-scan-choice") {
    return false;
  }
  const step = currentTutorialGuideStep();
  return Boolean(step && step.focus === "scanner-panel" && tutorialGuideMatches(step, "scanComplete"));
}

function syncTutorialScannerLock() {
  if (!els.closeScanner) {
    return;
  }
  const locked = tutorialScannerCloseLocked();
  els.closeScanner.disabled = locked;
  els.closeScanner.setAttribute("aria-disabled", locked ? "true" : "false");
  els.closeScanner.title = locked ? "Tarama bitmeden bu panel kapatılamaz." : "";
}

function applyTutorialFocus(step) {
  clearTutorialFocus();
  const targets = tutorialTargetsFor(step.focus).filter(Boolean);
  if (!targets.length) {
    return;
  }
  document.body.classList.add("tutorial-active");
  targets.forEach((element, index) => {
    element.classList.add("tutorial-focus");
    if (index > 0) {
      element.classList.add("tutorial-soft-focus");
    }
    if (step.waitFor === "dismiss") {
      element.classList.add("tutorial-locked");
    }
  });
  state.tutorialGuide.focused = targets;
}

function hideTutorialGuide() {
  state.tutorialGuide.active = false;
  state.tutorialGuide.steps = [];
  state.tutorialGuide.index = -1;
  clearTutorialFocus();
  syncTutorialScannerLock();
  if (els.tutorialGuide) {
    els.tutorialGuide.classList.remove("is-passive");
    delete els.tutorialGuide.dataset.focus;
  }
  els.tutorialGuide?.classList.add("hidden");
}

function currentTutorialGuideStep() {
  if (!state.tutorialGuide.active) {
    return null;
  }
  return state.tutorialGuide.steps[state.tutorialGuide.index] || null;
}

function renderTutorialGuideStep() {
  const step = currentTutorialGuideStep();
  if (!step) {
    hideTutorialGuide();
    return;
  }

  prepareTutorialScannerSelection();
  applyTutorialFocus(step);
  els.tutorialGuide.classList.toggle("is-passive", step.waitFor === "dismiss");
  els.tutorialGuide.dataset.focus = step.focus || "";
  els.tutorialGuideTag.textContent = step.tag || "EĞİTİM";
  els.tutorialGuideStep.textContent = `Adım ${state.tutorialGuide.index + 1} / ${state.tutorialGuide.steps.length}`;
  els.tutorialGuideTitle.textContent = step.title;
  els.tutorialGuideText.textContent = step.text;
  els.tutorialGuideNext.textContent = step.buttonLabel || "Devam";
  els.tutorialGuideHint.textContent =
    step.waitFor === "dismiss"
      ? (step.hint || "Hazırsan devam et.")
      : (step.hint || "Bu adımı tamamlayınca eğitim otomatik ilerler.");
  els.tutorialGuideHint.classList.toggle("passive", step.waitFor !== "dismiss");
  els.tutorialGuideNext.classList.toggle("hidden", step.waitFor !== "dismiss");
  syncTutorialScannerLock();
  els.tutorialGuide.classList.remove("hidden");
  hideTaskNotice();
}

function advanceTutorialGuide() {
  if (!state.tutorialGuide.active) {
    return;
  }
  state.tutorialGuide.index += 1;
  if (state.tutorialGuide.index >= state.tutorialGuide.steps.length) {
    hideTutorialGuide();
    return;
  }
  renderTutorialGuideStep();
}

function tutorialGuideMatches(step, trigger) {
  if (!step) {
    return false;
  }
  const waits = Array.isArray(step.waitFor) ? step.waitFor : [step.waitFor];
  return waits.includes(trigger);
}

function notifyTutorialTrigger(trigger) {
  const step = currentTutorialGuideStep();
  if (!state.tutorialMode || !step) {
    return;
  }
  if (!tutorialGuideMatches(step, trigger)) {
    return;
  }
  window.setTimeout(advanceTutorialGuide, step.delay ?? 180);
}

function tutorialGuideStepsForCrisis(crisisId) {
  switch (crisisId) {
    case "tutorial-read-choice":
      return [
        {
          tag: "EĞİTİM // GÖSTERGELER",
          title: "Üstteki göstergelere bak",
          text: "Süre azalırsa çalışma kapanır. Stabilite yanlış kararlarla düşer. Sıcaklık yükselirse sistemler zorlanır. Eğitimde bunlar seni baskılamayacak; önce yerlerini tanıman yeterli.",
          hint: "Hazırsan devam et.",
          focus: "hud",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // KRİZ EKRANI",
          title: "Önce bu ana alanı oku",
          text: "Her pakette önce başlığı, kısa açıklamayı ve canlı veri kartlarını okursun. Doğru karar çoğu zaman önce bu bölümden çıkar.",
          hint: "Bir sonraki adımda ilk kararı vereceksin.",
          focus: "reactor",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // İLK KARAR",
          title: "Şimdi yalnız bir şık seç",
          text: "Aşağıdaki karar kartlarından en mantıklı yorumu seç. Bu adımda sadece veri okuyup bir şık seçmeyi tanıyorsun.",
          hint: "Şimdi bir şıka bas.",
          focus: "choices",
          waitFor: "choiceResolved",
        },
      ];
    case "tutorial-scan-choice":
      return [
        {
          tag: "EĞİTİM // TARAMA",
          title: "Önce tarama konsolunu aç",
          text: "Bu pakette doğrudan şık işaretlenmez. Önce sağdaki Atom Tarama Konsolu'nu açıp veri toplayacağız.",
          hint: "Sağdaki Atom Tarama Konsolu düğmesine bas.",
          focus: "scanner-button",
          waitFor: "scannerOpen",
        },
        {
          tag: "EĞİTİM // TARAMA",
          title: "Na için ham veri çek",
          text: "Bu soruda Na isteniyor. Panelde Atom alanında Na'yı seç; Na zaten hazır gelmeli. Sonra yalnız Tarama Başlat'a bas ve sonucun gelmesini bekle.",
          hint: "Tarama bitince eğitim kendisi ilerler.",
          focus: "scanner-panel",
          waitFor: "scanComplete",
        },
        {
          tag: "EĞİTİM // TARAMA",
          title: "Panele geri dön",
          text: "Ham veri geldi. Şimdi paneli kapatıp ana krize döneceğiz; kararını orada vereceksin.",
          hint: "Kapat düğmesine bas.",
          focus: "scanner-close",
          waitFor: "scannerClosed",
        },
        {
          tag: "EĞİTİM // TARAMA SONRASI",
          title: "Şimdi kararı ver",
          text: "Tarama cevabı direkt söylemez; ama doğru yorumu daraltır. Şimdi şıklardan doğru kararı seç.",
          hint: "Tarama sonucuna bakıp şık seç.",
          focus: "choices",
          waitFor: "choiceResolved",
        },
      ];
    case "tutorial-heat-choice":
      return [
        {
          tag: "EĞİTİM // DENGE",
          title: "Stabilite ve sıcaklığı birlikte oku",
          text: "Stabilite yanlış kararlarla düşer. Sıcaklık yükselirse tarama gibi sistemler bile kapanabilir. Bu iki göstergeyi birlikte takip etmen gerekir.",
          hint: "Hazırsan devam et.",
          focus: "hud",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // KRİTİK ALARM",
          title: "Kritik paketler daha sert vurur",
          text: "Bazı krizler kritik gelir. Üstteki alarm rozeti bunu gösterir. Kritik pakette yanlış karar verirsen stabilite daha sert düşer.",
          hint: "Hazırsan yan sistemlere bak.",
          focus: "alarm",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // YAN SİSTEMLER",
          title: "Operatör notları ve yardımcı sistemler burada",
          text: "Sağ tarafta Operatör Notları bulunur. Aynı panelde Acil Soğutma, Derin Tanı, Yedek Sigorta ve Alan Sabitleme gibi yardımcı sistemler de yer alır. Sıkışırsan bunlar nefes aldırır.",
          hint: "Hazırsan soğutma düğmesini tanı.",
          focus: "notes-button",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // DENGE",
          title: "Soğutma düğmesinin yerini bil",
          text: "Sıcaklık yükseldiğinde sağdaki Soğutma Kontrolü ilk bakacağın yerlerden biridir. Bu eğitimde modülü açmayacağız; şimdilik yalnız yerini tanıman yeterli.",
          hint: "Hazırsan son karara geç.",
          focus: "cooling-button",
          waitFor: "dismiss",
        },
        {
          tag: "EĞİTİM // DENGE KARARI",
          title: "Şimdi en güvenli ilk adımı seç",
          text: "Bu pakette amaç, sistemi gereksiz zorlamadan ilk doğru adımı seçmek. Sıcaklık yükselmişse önce çekirdeği rahatlatmak çoğu zaman daha güvenlidir.",
          hint: "Şimdi doğru ilk adımı seç.",
          focus: "choices",
          waitFor: "choiceResolved",
        },
      ];
    default:
      return [];
  }
}

function startTutorialGuideForCurrentCrisis() {
  if (!state.tutorialMode || !state.currentCrisis) {
    hideTutorialGuide();
    return;
  }
  prepareTutorialScannerSelection();
  const steps = tutorialGuideStepsForCrisis(state.currentCrisis.id);
  if (!steps.length) {
    hideTutorialGuide();
    return;
  }
  state.tutorialGuide.active = true;
  state.tutorialGuide.steps = steps;
  state.tutorialGuide.index = 0;
  state.tutorialGuide.focused = [];
  renderTutorialGuideStep();
}

function persistRunStats(profile) {
  if (state.runPersisted || !state.runStartedAt || state.tutorialMode) {
    return;
  }

  const finishedAt = state.runFinishedAt || Date.now();
  const elapsedSeconds = Math.max(0, Math.round((finishedAt - state.runStartedAt) / 1000));
  const existing =
    loadMenuStats() || {
      runs: 0,
      wins: 0,
      totalDuration: 0,
      totalMistakes: 0,
      totalScans: 0,
      bestTime: null,
    };

  existing.runs += 1;
  if (profile.key !== "fail") {
    existing.wins += 1;
  }
  existing.totalDuration += elapsedSeconds;
  existing.totalMistakes += state.mistakes.length;
  existing.totalScans += state.stats.scanCount;
  if (profile.key !== "fail" && (existing.bestTime === null || elapsedSeconds < existing.bestTime)) {
    existing.bestTime = elapsedSeconds;
  }

  saveMenuStats(existing);
  state.runPersisted = true;
}

function randomId() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function clearAudioSchedulers() {
  clearTimeout(audioState.ambienceTimer);
  clearTimeout(audioState.alarmTimer);
  clearTimeout(audioState.heatTimer);
  clearTimeout(audioState.systemTimer);
  clearTimeout(audioState.incidentalTimer);
  audioState.ambienceTimer = null;
  audioState.alarmTimer = null;
  audioState.heatTimer = null;
  audioState.systemTimer = null;
  audioState.incidentalTimer = null;
}

function createNoiseBuffer(context, seconds = 2) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.42;
  }
  return buffer;
}

function clampAudioSample(value) {
  return Math.max(-1, Math.min(1, value));
}

function rampEnvelope(progress, attack = 0.08, release = 0.24) {
  if (progress < 0 || progress > 1) {
    return 0;
  }
  if (progress < attack) {
    return progress / attack;
  }
  if (progress > 1 - release) {
    return Math.max(0, (1 - progress) / release);
  }
  return 1;
}

function chirpSample(localTime, duration, fromHz, toHz) {
  const sweep = toHz - fromHz;
  const phase = (2 * Math.PI * (fromHz * localTime + (sweep * localTime * localTime) / (2 * duration)));
  return Math.sin(phase);
}

function createRenderedSample(context, duration, renderer) {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    const time = i / context.sampleRate;
    const progress = i / frameCount;
    data[i] = clampAudioSample(renderer(time, progress));
  }
  return buffer;
}

function buildSampleBank(context) {
  const durationMap = {
    coolant: 0.62,
    intel: 0.48,
    shield: 0.56,
    stasis: 0.72,
    terminalOpen: 0.28,
    terminalClose: 0.22,
    terminalSend: 0.18,
    terminalKey: 0.06,
    terminalSystem: 0.12,
    terminalGood: 0.18,
    terminalAlert: 0.22,
    panelOpen: 0.18,
    panelClose: 0.14,
    scanStart: 0.26,
    scanPulse: 0.16,
    scanDone: 0.28,
    warning: 0.42,
    critical: 0.52,
    ignite: 0.44,
    fireCrackle: 0.48,
    heatPop: 0.34,
    coolingStart: 0.34,
    coolingLoop: 0.24,
    coolingStop: 0.16,
    labPing: 0.22,
    labRelay: 0.18,
    labVent: 0.34,
    labServo: 0.26,
    labClang: 0.82,
    labDrop: 0.74,
    labCreak: 0.92,
    labGroan: 1.08,
    outcomePerfect: 0.96,
    outcomeSalvaged: 0.88,
    outcomeDamaged: 0.82,
    outcomeFail: 0.84,
    outcomeMeltdown: 1.02,
    outcomeTimeout: 0.78,
    outcomeCollapse: 0.94,
    outcomeLockout: 0.86,
  };

  return {
    "utility-coolant": createRenderedSample(context, durationMap.coolant, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.34);
      const lowSweep = Math.sin(2 * Math.PI * (176 - progress * 64) * time) * 0.18 * env;
      const ventBed = Math.sin(2 * Math.PI * 42 * time) * 0.06 * env;
      const hiss = (Math.random() * 2 - 1) * (0.18 + progress * 0.08) * env * (0.7 - progress * 0.28);
      const spit =
        Math.sin(2 * Math.PI * (520 + progress * 80) * time) *
        0.05 *
        rampEnvelope(Math.max(0, (progress - 0.18) / 0.22), 0.3, 0.5);
      return lowSweep + ventBed + hiss * 0.34 + spit;
    }),
    "utility-intel": createRenderedSample(context, durationMap.intel, (time, progress) => {
      const bursts = [
        { start: 0.02, len: 0.08, from: 420, to: 780, amp: 0.24 },
        { start: 0.14, len: 0.06, from: 520, to: 940, amp: 0.19 },
        { start: 0.25, len: 0.05, from: 620, to: 1120, amp: 0.15 },
      ];
      let value = 0;
      bursts.forEach((burst) => {
        if (time >= burst.start && time <= burst.start + burst.len) {
          const local = time - burst.start;
          const env = rampEnvelope(local / burst.len, 0.18, 0.42);
          value += chirpSample(local, burst.len, burst.from, burst.to) * burst.amp * env;
        }
      });
      const blipGate = Math.sin(2 * Math.PI * 7 * time) > 0.76 ? 1 : 0;
      value += Math.sin(2 * Math.PI * 1280 * time) * 0.018 * blipGate * (1 - progress);
      return value;
    }),
    "utility-shield": createRenderedSample(context, durationMap.shield, (time, progress) => {
      const env = rampEnvelope(progress, 0.015, 0.44);
      const body = Math.sin(2 * Math.PI * 214 * time) * 0.18 * env;
      const ringA = Math.sin(2 * Math.PI * 486 * time) * 0.11 * rampEnvelope(progress, 0.02, 0.58);
      const ringB = Math.sin(2 * Math.PI * 742 * time) * 0.06 * rampEnvelope(Math.max(0, progress - 0.04), 0.06, 0.58);
      const impact = (Math.random() * 2 - 1) * 0.09 * Math.exp(-time * 22);
      return body + ringA + ringB + impact;
    }),
    "utility-stasis": createRenderedSample(context, durationMap.stasis, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.28);
      const warp = Math.sin(2 * Math.PI * 0.9 * time) * 16;
      const toneA = Math.sin(2 * Math.PI * ((278 - progress * 78) + warp) * time) * 0.16 * env;
      const toneB = Math.sin(2 * Math.PI * ((392 - progress * 120) - warp * 0.6) * time) * 0.08 * env;
      const haze = (Math.random() * 2 - 1) * 0.04 * env * (0.8 - progress * 0.5);
      return toneA + toneB + haze;
    }),
    "terminal-open": createRenderedSample(context, durationMap.terminalOpen, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.26);
      const relay = Math.sin(2 * Math.PI * 148 * time) * 0.08 * Math.exp(-time * 24);
      const wake = chirpSample(time, durationMap.terminalOpen, 128, 430) * 0.14 * env;
      const hum = Math.sin(2 * Math.PI * 92 * time) * 0.04 * rampEnvelope(Math.max(0, progress - 0.08), 0.18, 0.3);
      const screenFizz = (Math.random() * 2 - 1) * 0.032 * Math.exp(-time * 8);
      const dataTick =
        Math.sin(2 * Math.PI * 1240 * time) *
        0.02 *
        (time > 0.11 && time < 0.17 ? rampEnvelope((time - 0.11) / 0.06, 0.18, 0.44) : 0);
      return relay + wake + hum + screenFizz + dataTick;
    }),
    "terminal-close": createRenderedSample(context, durationMap.terminalClose, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.5);
      const click = Math.sin(2 * Math.PI * 176 * time) * 0.07 * Math.exp(-time * 22);
      const powerDown = chirpSample(time, durationMap.terminalClose, 360, 74) * 0.13 * env;
      const tailHum = Math.sin(2 * Math.PI * 96 * time) * 0.038 * (1 - progress);
      const discharge = (Math.random() * 2 - 1) * 0.024 * Math.exp(-time * 14);
      return click + powerDown + tailHum + discharge;
    }),
    "terminal-send": createRenderedSample(context, durationMap.terminalSend, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.38);
      const gate = Math.sign(Math.sin(2 * Math.PI * 820 * time)) * 0.09 * env;
      const chirp = chirpSample(time, durationMap.terminalSend, 380, 720) * 0.08 * env;
      return gate + chirp;
    }),
    "terminal-key": createRenderedSample(context, durationMap.terminalKey, (time, progress) => {
      const env = rampEnvelope(progress, 0.08, 0.55);
      const click = Math.sin(2 * Math.PI * 1240 * time) * 0.08 * env;
      const grit = (Math.random() * 2 - 1) * 0.04 * Math.exp(-time * 46);
      return click + grit;
    }),
    "terminal-system": createRenderedSample(context, durationMap.terminalSystem, (time, progress) => {
      const env = rampEnvelope(progress, 0.08, 0.34);
      const a = Math.sin(2 * Math.PI * 318 * time) * 0.12 * env;
      const b = time > 0.03 ? Math.sin(2 * Math.PI * 512 * (time - 0.03)) * 0.08 * rampEnvelope((time - 0.03) / 0.09, 0.2, 0.4) : 0;
      return a + b;
    }),
    "terminal-good": createRenderedSample(context, durationMap.terminalGood, (time, progress) => {
      const env = rampEnvelope(progress, 0.05, 0.28);
      const a = Math.sin(2 * Math.PI * 418 * time) * 0.12 * env;
      const b = time > 0.05 ? Math.sin(2 * Math.PI * 648 * (time - 0.05)) * 0.09 * rampEnvelope((time - 0.05) / 0.12, 0.18, 0.42) : 0;
      return a + b;
    }),
    "terminal-alert": createRenderedSample(context, durationMap.terminalAlert, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.3);
      const buzz = Math.sign(Math.sin(2 * Math.PI * 230 * time)) * 0.12 * env;
      const low = Math.sin(2 * Math.PI * 146 * time) * 0.06 * env;
      const grit = (Math.random() * 2 - 1) * 0.05 * env;
      return buzz + low + grit;
    }),
    "panel-open": createRenderedSample(context, durationMap.panelOpen, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.32);
      const thunk = Math.sin(2 * Math.PI * 184 * time) * 0.11 * env;
      const sweep = chirpSample(time, durationMap.panelOpen, 160, 250) * 0.06 * env;
      return thunk + sweep;
    }),
    "panel-close": createRenderedSample(context, durationMap.panelClose, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.42);
      return chirpSample(time, durationMap.panelClose, 320, 170) * 0.09 * env;
    }),
    "scan-start": createRenderedSample(context, durationMap.scanStart, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.26);
      const sweep = chirpSample(time, durationMap.scanStart, 260, 760) * 0.15 * env;
      const under = Math.sin(2 * Math.PI * 228 * time) * 0.05 * env;
      return sweep + under;
    }),
    "scan-pulse": createRenderedSample(context, durationMap.scanPulse, (time, progress) => {
      const env = rampEnvelope(progress, 0.06, 0.36);
      const ping = chirpSample(time, durationMap.scanPulse, 740, 540) * 0.13 * env;
      const tail = Math.sin(2 * Math.PI * 322 * time) * 0.05 * rampEnvelope(Math.max(0, progress - 0.12), 0.2, 0.4);
      return ping + tail;
    }),
    "scan-done": createRenderedSample(context, durationMap.scanDone, (time, progress) => {
      const env = rampEnvelope(progress, 0.05, 0.3);
      const a = Math.sin(2 * Math.PI * 304 * time) * 0.11 * env;
      const b = time > 0.06 ? Math.sin(2 * Math.PI * 412 * (time - 0.06)) * 0.1 * rampEnvelope((time - 0.06) / 0.14, 0.15, 0.38) : 0;
      const c = time > 0.12 ? Math.sin(2 * Math.PI * 618 * (time - 0.12)) * 0.07 * rampEnvelope((time - 0.12) / 0.1, 0.15, 0.36) : 0;
      return a + b + c;
    }),
    warning: createRenderedSample(context, durationMap.warning, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.16);
      const siren = Math.sin(2 * Math.PI * (460 + Math.sin(2 * Math.PI * 3.2 * time) * 90) * time) * 0.14 * env;
      const low = Math.sin(2 * Math.PI * 164 * time) * 0.03 * env;
      return siren + low;
    }),
    critical: createRenderedSample(context, durationMap.critical, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.14);
      const a = Math.sign(Math.sin(2 * Math.PI * (620 + Math.sin(2 * Math.PI * 2.4 * time) * 110) * time)) * 0.11 * env;
      const b = Math.sin(2 * Math.PI * (190 + Math.sin(2 * Math.PI * 2.8 * time) * 34) * time) * 0.06 * env;
      const grit = (Math.random() * 2 - 1) * 0.03 * env;
      return a + b + grit;
    }),
    ignite: createRenderedSample(context, durationMap.ignite, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.22);
      const whoosh = (Math.random() * 2 - 1) * (0.3 - progress * 0.13) * env * (0.96 - progress * 0.32);
      const bed = (Math.random() * 2 - 1) * 0.085 * env * (0.88 - progress * 0.18);
      const rumbleA = Math.sin(2 * Math.PI * (52 - progress * 6) * time) * 0.034 * env;
      const rumbleB = Math.sin(2 * Math.PI * (84 - progress * 9) * time) * 0.022 * env;
      const crackleMaskA = Math.sin(2 * Math.PI * 7.4 * time) > 0.82 ? 1 : 0;
      const crackleMaskB = Math.sin(2 * Math.PI * 11.8 * time + 0.7) > 0.87 ? 1 : 0;
      const crackleA = ((Math.random() * 2 - 1) * 0.1 + Math.sin(2 * Math.PI * 1260 * time) * 0.025) * crackleMaskA * env;
      const crackleB = ((Math.random() * 2 - 1) * 0.08 + Math.sin(2 * Math.PI * 1740 * time) * 0.02) * crackleMaskB * env;
      const emberTick = Math.sin(2 * Math.PI * 2320 * time) * 0.012 * (Math.sin(2 * Math.PI * 15.4 * time + 1.1) > 0.9 ? 1 : 0) * env;
      return whoosh * 0.42 + bed * 0.34 + rumbleA + rumbleB + crackleA * 0.38 + crackleB * 0.34 + emberTick;
    }),
    "fire-crackle": createRenderedSample(context, durationMap.fireCrackle, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.2);
      const bed = (Math.random() * 2 - 1) * 0.1 * env * (0.92 - progress * 0.16);
      const emberNoise = (Math.random() * 2 - 1) * 0.05 * env * (0.84 - progress * 0.14);
      const lowRoarA = Math.sin(2 * Math.PI * (48 + Math.sin(2 * Math.PI * 0.8 * time) * 3) * time) * 0.024 * env;
      const lowRoarB = Math.sin(2 * Math.PI * (79 + Math.sin(2 * Math.PI * 1.1 * time + 0.6) * 4) * time) * 0.016 * env;
      const crackleMaskA = Math.sin(2 * Math.PI * 8.6 * time) > 0.84 ? 1 : 0;
      const crackleMaskB = Math.sin(2 * Math.PI * 13.2 * time + 0.4) > 0.9 ? 1 : 0;
      const crackleMaskC = Math.sin(2 * Math.PI * 5.8 * time + 1.1) > 0.92 ? 1 : 0;
      const crackleA = ((Math.random() * 2 - 1) * 0.085 + Math.sin(2 * Math.PI * 1180 * time) * 0.022) * crackleMaskA * env;
      const crackleB = ((Math.random() * 2 - 1) * 0.072 + Math.sin(2 * Math.PI * 1680 * time) * 0.018) * crackleMaskB * env;
      const crackleC = ((Math.random() * 2 - 1) * 0.06 + Math.sin(2 * Math.PI * 2260 * time) * 0.014) * crackleMaskC * env;
      return bed * 0.36 + emberNoise * 0.22 + lowRoarA + lowRoarB + crackleA * 0.42 + crackleB * 0.36 + crackleC * 0.3;
    }),
    "heat-pop": createRenderedSample(context, durationMap.heatPop, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.42);
      const crackle = (Math.random() * 2 - 1) * (0.14 - progress * 0.08) * env;
      const ember = Math.sin(2 * Math.PI * (154 - progress * 42) * time) * 0.08 * env;
      const spit = Math.sin(2 * Math.PI * 980 * time) * 0.03 * (Math.sin(2 * Math.PI * 11 * time) > 0.75 ? 1 : 0) * env;
      return crackle * 0.46 + ember + spit;
    }),
    "cooling-start": createRenderedSample(context, durationMap.coolingStart, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.24);
      const vent = (Math.random() * 2 - 1) * 0.12 * env * (0.9 - progress * 0.3);
      const under = Math.sin(2 * Math.PI * (144 - progress * 24) * time) * 0.08 * env;
      return vent * 0.42 + under;
    }),
    "cooling-loop": createRenderedSample(context, durationMap.coolingLoop, (time, progress) => {
      const env = rampEnvelope(progress, 0.06, 0.38);
      const vent = (Math.random() * 2 - 1) * 0.1 * env * (0.84 - progress * 0.22);
      const tone = Math.sin(2 * Math.PI * 118 * time) * 0.05 * env;
      return vent * 0.36 + tone;
    }),
    "cooling-stop": createRenderedSample(context, durationMap.coolingStop, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.5);
      return chirpSample(time, durationMap.coolingStop, 220, 150) * 0.08 * env;
    }),
    "lab-ping": createRenderedSample(context, durationMap.labPing, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.28);
      const ping = Math.sin(2 * Math.PI * 880 * time) * 0.14 * env;
      const tail = time > 0.03 ? Math.sin(2 * Math.PI * 520 * (time - 0.03)) * 0.08 * rampEnvelope((time - 0.03) / 0.16, 0.16, 0.46) : 0;
      return ping + tail;
    }),
    "lab-relay": createRenderedSample(context, durationMap.labRelay, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.42);
      const thunk = Math.sin(2 * Math.PI * 210 * time) * 0.11 * Math.exp(-time * 16);
      const tick = Math.sin(2 * Math.PI * 1260 * time) * 0.045 * env;
      const grit = (Math.random() * 2 - 1) * 0.038 * Math.exp(-time * 22);
      return thunk + tick + grit;
    }),
    "lab-vent": createRenderedSample(context, durationMap.labVent, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.26);
      const hiss = (Math.random() * 2 - 1) * 0.18 * env * (0.92 - progress * 0.28);
      const body = Math.sin(2 * Math.PI * 98 * time) * 0.04 * env;
      return hiss * 0.5 + body;
    }),
    "lab-servo": createRenderedSample(context, durationMap.labServo, (time, progress) => {
      const env = rampEnvelope(progress, 0.04, 0.32);
      const sweep = chirpSample(time, durationMap.labServo, 180, 340) * 0.12 * env;
      const click = Math.sin(2 * Math.PI * 980 * time) * 0.03 * (Math.sin(2 * Math.PI * 14 * time) > 0.82 ? 1 : 0) * env;
      return sweep + click;
    }),
    "lab-clang": createRenderedSample(context, durationMap.labClang, (time, progress) => {
      const env = rampEnvelope(progress, 0.01, 0.6);
      const body = Math.sin(2 * Math.PI * 186 * time) * 0.14 * Math.exp(-time * 4.2);
      const ringA = Math.sin(2 * Math.PI * 372 * time) * 0.09 * Math.exp(-time * 5.2);
      const ringB = Math.sin(2 * Math.PI * 744 * time) * 0.05 * Math.exp(-time * 7.5);
      const ringC = Math.sin(2 * Math.PI * 1190 * time) * 0.026 * Math.exp(-time * 10.5);
      const grit = (Math.random() * 2 - 1) * 0.018 * env * (0.9 - progress * 0.25);
      return body + ringA + ringB + ringC + grit;
    }),
    "lab-drop": createRenderedSample(context, durationMap.labDrop, (time, progress) => {
      const env = rampEnvelope(progress, 0.01, 0.52);
      const thunk = Math.sin(2 * Math.PI * 94 * time) * 0.12 * Math.exp(-time * 5.8);
      const strike = Math.sin(2 * Math.PI * 268 * time) * 0.1 * Math.exp(-time * 8.2);
      const tail = Math.sin(2 * Math.PI * 516 * time) * 0.048 * Math.exp(-time * 9.8);
      const noise = (Math.random() * 2 - 1) * 0.022 * env * Math.exp(-time * 7.4);
      return thunk + strike + tail + noise;
    }),
    "lab-creak": createRenderedSample(context, durationMap.labCreak, (time, progress) => {
      const env = rampEnvelope(progress, 0.06, 0.26);
      const bendA = Math.sin(2 * Math.PI * (128 + Math.sin(2 * Math.PI * 0.9 * time) * 26) * time) * 0.07 * env;
      const bendB = Math.sin(2 * Math.PI * (196 + Math.sin(2 * Math.PI * 1.1 * time + 0.5) * 18) * time) * 0.04 * env;
      const rasp = (Math.random() * 2 - 1) * 0.042 * env * (Math.sin(2 * Math.PI * 7.2 * time) > 0.15 ? 1 : 0);
      return bendA + bendB + rasp;
    }),
    "lab-groan": createRenderedSample(context, durationMap.labGroan, (time, progress) => {
      const env = rampEnvelope(progress, 0.08, 0.22);
      const base = Math.sin(2 * Math.PI * (64 + Math.sin(2 * Math.PI * 0.35 * time) * 6) * time) * 0.062 * env;
      const upper = Math.sin(2 * Math.PI * (126 + Math.sin(2 * Math.PI * 0.44 * time + 0.8) * 8) * time) * 0.032 * env;
      const texture = (Math.random() * 2 - 1) * 0.024 * env * (0.92 - progress * 0.24);
      return base + upper + texture;
    }),
    "outcome-perfect": createRenderedSample(context, durationMap.outcomePerfect, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.18);
      const a = Math.sin(2 * Math.PI * 262 * time) * 0.08 * env;
      const b = time > 0.09 ? Math.sin(2 * Math.PI * 392 * (time - 0.09)) * 0.1 * rampEnvelope((time - 0.09) / 0.18, 0.18, 0.3) : 0;
      const c = time > 0.18 ? Math.sin(2 * Math.PI * 523 * (time - 0.18)) * 0.11 * rampEnvelope((time - 0.18) / 0.22, 0.15, 0.32) : 0;
      const shine = chirpSample(time, durationMap.outcomePerfect, 540, 920) * 0.028 * env * Math.max(0, 1 - progress * 0.65);
      return a + b + c + shine;
    }),
    "outcome-salvaged": createRenderedSample(context, durationMap.outcomeSalvaged, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.2);
      const a = Math.sin(2 * Math.PI * 220 * time) * 0.08 * env;
      const b = time > 0.1 ? Math.sin(2 * Math.PI * 330 * (time - 0.1)) * 0.08 * rampEnvelope((time - 0.1) / 0.2, 0.16, 0.32) : 0;
      const c = time > 0.22 ? Math.sin(2 * Math.PI * 440 * (time - 0.22)) * 0.06 * rampEnvelope((time - 0.22) / 0.18, 0.16, 0.34) : 0;
      const grit = (Math.random() * 2 - 1) * 0.018 * env * (0.6 - progress * 0.3);
      return a + b + c + grit;
    }),
    "outcome-damaged": createRenderedSample(context, durationMap.outcomeDamaged, (time, progress) => {
      const env = rampEnvelope(progress, 0.03, 0.24);
      const low = Math.sin(2 * Math.PI * 164 * time) * 0.085 * env;
      const mid = time > 0.12 ? Math.sin(2 * Math.PI * 246 * (time - 0.12)) * 0.062 * rampEnvelope((time - 0.12) / 0.18, 0.18, 0.34) : 0;
      const warn = chirpSample(time, durationMap.outcomeDamaged, 210, 320) * 0.03 * env;
      return low + mid + warn;
    }),
    "outcome-fail": createRenderedSample(context, durationMap.outcomeFail, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.16);
      const buzz = Math.sign(Math.sin(2 * Math.PI * 188 * time)) * 0.09 * env;
      const fall = chirpSample(time, durationMap.outcomeFail, 220, 92) * 0.07 * env;
      const grit = (Math.random() * 2 - 1) * 0.024 * env;
      return buzz + fall + grit;
    }),
    "outcome-meltdown": createRenderedSample(context, durationMap.outcomeMeltdown, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.12);
      const siren = Math.sign(Math.sin(2 * Math.PI * (310 + Math.sin(2 * Math.PI * 2.2 * time) * 86) * time)) * 0.095 * env;
      const rumble = Math.sin(2 * Math.PI * (74 - progress * 18) * time) * 0.072 * env;
      const fire = (Math.random() * 2 - 1) * 0.038 * env * (0.9 - progress * 0.2);
      return siren + rumble + fire;
    }),
    "outcome-timeout": createRenderedSample(context, durationMap.outcomeTimeout, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.16);
      const ticks = Math.sign(Math.sin(2 * Math.PI * 5.5 * time)) * Math.sin(2 * Math.PI * 780 * time) * 0.045 * env;
      const drop = chirpSample(time, durationMap.outcomeTimeout, 420, 140) * 0.068 * env;
      return ticks + drop;
    }),
    "outcome-collapse": createRenderedSample(context, durationMap.outcomeCollapse, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.16);
      const body = Math.sin(2 * Math.PI * (142 - progress * 42) * time) * 0.094 * env;
      const thud = Math.sin(2 * Math.PI * 88 * time) * 0.05 * Math.exp(-time * 4.8);
      const haze = (Math.random() * 2 - 1) * 0.022 * env;
      return body + thud + haze;
    }),
    "outcome-lockout": createRenderedSample(context, durationMap.outcomeLockout, (time, progress) => {
      const env = rampEnvelope(progress, 0.02, 0.16);
      const deny = Math.sign(Math.sin(2 * Math.PI * 240 * time)) * 0.074 * env;
      const bit = chirpSample(time, durationMap.outcomeLockout, 520, 250) * 0.05 * env;
      const grit = (Math.random() * 2 - 1) * 0.02 * env;
      return deny + bit + grit;
    }),
  };
}

function playSample(name, options = {}) {
  if (!audioState.context || !audioState.enabled || audioState.context.state !== "running") {
    return false;
  }

  const buffer = audioState.samples?.[name];
  if (!buffer) {
    return false;
  }

  const source = audioState.context.createBufferSource();
  const gain = audioState.context.createGain();
  const now = audioState.context.currentTime + (options.start || 0);
  const volume = options.volume ?? 1;
  const playbackRate = options.playbackRate ?? 1;
  const variation = options.randomRate ?? 0;
  const effectiveRate = variation ? playbackRate + (Math.random() * variation * 2 - variation) : playbackRate;
  source.buffer = buffer;
  source.playbackRate.setValueAtTime(Math.max(0.6, effectiveRate), now);
  gain.gain.setValueAtTime(volume, now);
  source.connect(gain);
  gain.connect(audioState.fxGain);
  source.start(now);
  return true;
}

function renderAudioButtons() {
  if (!els.audioToggle || !els.musicToggle) {
    return;
  }

  if (!audioState.supported) {
    els.audioStatus.textContent = "Yok";
    els.musicStatus.textContent = "Yok";
    els.audioToggle.disabled = true;
    els.musicToggle.disabled = true;
    return;
  }

  els.audioStatus.textContent = audioState.enabled ? "Açık" : "Kapalı";
  els.musicStatus.textContent = audioState.musicEnabled ? "Açık" : "Kapalı";
  els.audioToggle.classList.toggle("active", audioState.enabled);
  els.musicToggle.classList.toggle("active", audioState.musicEnabled);
}

function ensureFireLoop() {
  if (audioState.fireLoop) {
    return audioState.fireLoop;
  }
  const audio = new Audio("./assets/campfire.mp3");
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  audioState.fireLoop = audio;
  return audio;
}

function desiredFireLoopVolume() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return 0;
  }
  if (!state.active) {
    return 0;
  }
  if (state.heat >= 88) {
    return 0.4;
  }
  if (state.heat >= 70) {
    return 0.26;
  }
  return 0;
}

function syncFireLoop() {
  const loop = ensureFireLoop();
  const target = desiredFireLoopVolume();

  if (target > 0) {
    loop.volume = target;
    const playPromise = loop.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    return;
  }

  loop.volume = 0;
  if (!loop.paused) {
    loop.pause();
  }
}

function ensureAudioGraph() {
  if (!audioState.supported || audioState.context) {
    return audioState.context;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContextClass();
  const master = context.createGain();
  const musicGain = context.createGain();
  const fxGain = context.createGain();
  const ambientBaseGain = context.createGain();
  const ambientPulseGain = context.createGain();
  const ambientNoiseGain = context.createGain();
  const ambientAirGain = context.createGain();
  const ambientRattleGain = context.createGain();
  const fireBedGain = context.createGain();
  const menuPadGain = context.createGain();
  const menuShineGain = context.createGain();

  master.gain.value = 0.0001;
  musicGain.gain.value = 0.0001;
  fxGain.gain.value = 0.68;
  ambientBaseGain.gain.value = 0.14;
  ambientPulseGain.gain.value = 0.068;
  ambientNoiseGain.gain.value = 0.056;
  ambientAirGain.gain.value = 0.064;
  ambientRattleGain.gain.value = 0.0001;
  fireBedGain.gain.value = 0.0001;
  menuPadGain.gain.value = 0.0001;
  menuShineGain.gain.value = 0.0001;

  master.connect(context.destination);
  musicGain.connect(master);
  fxGain.connect(master);
  ambientBaseGain.connect(musicGain);
  ambientPulseGain.connect(musicGain);
  ambientNoiseGain.connect(musicGain);
  ambientAirGain.connect(musicGain);
  ambientRattleGain.connect(musicGain);
  fireBedGain.connect(musicGain);
  menuPadGain.connect(musicGain);
  menuShineGain.connect(musicGain);

  const droneA = context.createOscillator();
  droneA.type = "sine";
  droneA.frequency.value = 98;
  droneA.connect(ambientBaseGain);

  const droneB = context.createOscillator();
  droneB.type = "triangle";
  droneB.frequency.value = 147;
  droneB.detune.value = 2;
  droneB.connect(ambientBaseGain);

  const shimmer = context.createOscillator();
  shimmer.type = "triangle";
  shimmer.frequency.value = 196;
  shimmer.detune.value = -2;
  shimmer.connect(ambientPulseGain);

  const airTone = context.createOscillator();
  airTone.type = "sine";
  airTone.frequency.value = 294;
  airTone.detune.value = -5;
  airTone.connect(ambientAirGain);

  const pulse = context.createOscillator();
  pulse.type = "sine";
  pulse.frequency.value = 0.12;
  const pulseDepth = context.createGain();
  pulseDepth.gain.value = 0.012;
  pulse.connect(pulseDepth);
  pulseDepth.connect(ambientBaseGain.gain);

  const shimmerLfo = context.createOscillator();
  shimmerLfo.type = "sine";
  shimmerLfo.frequency.value = 0.13;
  const shimmerDepth = context.createGain();
  shimmerDepth.gain.value = 7;
  shimmerLfo.connect(shimmerDepth);
  shimmerDepth.connect(shimmer.detune);

  const airLfo = context.createOscillator();
  airLfo.type = "sine";
  airLfo.frequency.value = 0.06;
  const airDepth = context.createGain();
  airDepth.gain.value = 6;
  airLfo.connect(airDepth);
  airDepth.connect(airTone.detune);

  const noiseSource = context.createBufferSource();
  noiseSource.buffer = createNoiseBuffer(context, 2);
  noiseSource.loop = true;
  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 980;
  noiseFilter.Q.value = 0.42;
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(ambientNoiseGain);

  const noiseLfo = context.createOscillator();
  noiseLfo.type = "sine";
  noiseLfo.frequency.value = 0.07;
  const noiseDepth = context.createGain();
  noiseDepth.gain.value = 180;
  noiseLfo.connect(noiseDepth);
  noiseDepth.connect(noiseFilter.frequency);

  const rattleSource = context.createBufferSource();
  rattleSource.buffer = createNoiseBuffer(context, 2.4);
  rattleSource.loop = true;
  const rattleFilter = context.createBiquadFilter();
  rattleFilter.type = "bandpass";
  rattleFilter.frequency.value = 420;
  rattleFilter.Q.value = 0.38;
  rattleSource.connect(rattleFilter);
  rattleFilter.connect(ambientRattleGain);

  const rattleLfo = context.createOscillator();
  rattleLfo.type = "sine";
  rattleLfo.frequency.value = 0.09;
  const rattleDepth = context.createGain();
  rattleDepth.gain.value = 80;
  rattleLfo.connect(rattleDepth);
  rattleDepth.connect(rattleFilter.frequency);

  const fireSource = context.createBufferSource();
  fireSource.buffer = createNoiseBuffer(context, 2.2);
  fireSource.loop = true;
  const fireFilter = context.createBiquadFilter();
  fireFilter.type = "bandpass";
  fireFilter.frequency.value = 1380;
  fireFilter.Q.value = 0.52;
  fireSource.connect(fireFilter);
  fireFilter.connect(fireBedGain);

  const fireLfo = context.createOscillator();
  fireLfo.type = "sine";
  fireLfo.frequency.value = 0.14;
  const fireDepth = context.createGain();
  fireDepth.gain.value = 260;
  fireLfo.connect(fireDepth);
  fireDepth.connect(fireFilter.frequency);

  const menuDroneA = context.createOscillator();
  menuDroneA.type = "triangle";
  menuDroneA.frequency.value = 164;
  menuDroneA.detune.value = -3;
  menuDroneA.connect(menuPadGain);

  const menuDroneB = context.createOscillator();
  menuDroneB.type = "sine";
  menuDroneB.frequency.value = 246;
  menuDroneB.detune.value = 4;
  menuDroneB.connect(menuPadGain);

  const menuShine = context.createOscillator();
  menuShine.type = "triangle";
  menuShine.frequency.value = 392;
  menuShine.detune.value = -6;
  menuShine.connect(menuShineGain);

  const menuLfo = context.createOscillator();
  menuLfo.type = "sine";
  menuLfo.frequency.value = 0.09;
  const menuDepth = context.createGain();
  menuDepth.gain.value = 10;
  menuLfo.connect(menuDepth);
  menuDepth.connect(menuDroneB.detune);

  const menuShineLfo = context.createOscillator();
  menuShineLfo.type = "sine";
  menuShineLfo.frequency.value = 0.15;
  const menuShineDepth = context.createGain();
  menuShineDepth.gain.value = 8;
  menuShineLfo.connect(menuShineDepth);
  menuShineDepth.connect(menuShine.detune);

  const menuPadPulse = context.createOscillator();
  menuPadPulse.type = "sine";
  menuPadPulse.frequency.value = 0.07;
  const menuPadPulseDepth = context.createGain();
  menuPadPulseDepth.gain.value = 0.018;
  menuPadPulse.connect(menuPadPulseDepth);
  menuPadPulseDepth.connect(menuPadGain.gain);

  const menuShinePulse = context.createOscillator();
  menuShinePulse.type = "sine";
  menuShinePulse.frequency.value = 0.12;
  const menuShinePulseDepth = context.createGain();
  menuShinePulseDepth.gain.value = 0.012;
  menuShinePulse.connect(menuShinePulseDepth);
  menuShinePulseDepth.connect(menuShineGain.gain);

  [droneA, droneB, shimmer, airTone, pulse, shimmerLfo, airLfo, noiseSource, noiseLfo, rattleSource, rattleLfo, fireSource, fireLfo, menuDroneA, menuDroneB, menuShine, menuLfo, menuShineLfo, menuPadPulse, menuShinePulse].forEach((node) =>
    node.start()
  );

  audioState.context = context;
  audioState.master = master;
  audioState.musicGain = musicGain;
  audioState.fxGain = fxGain;
  audioState.ambientBaseGain = ambientBaseGain;
  audioState.ambientPulseGain = ambientPulseGain;
  audioState.ambientNoiseGain = ambientNoiseGain;
  audioState.ambientAirGain = ambientAirGain;
  audioState.ambientRattleGain = ambientRattleGain;
  audioState.fireBedGain = fireBedGain;
  audioState.menuPadGain = menuPadGain;
  audioState.menuShineGain = menuShineGain;
  audioState.samples = buildSampleBank(context);

  syncAudioMood(audioState.mood);
  renderAudioButtons();
  return context;
}

async function primeAudio() {
  const context = ensureAudioGraph();
  if (!context) {
    renderAudioButtons();
    return null;
  }
  if (context.state === "suspended") {
    try {
      await context.resume();
    } catch (error) {
      return context;
    }
  }
  audioState.primed = true;
  syncAudioMood(audioState.mood);
  syncFireLoop();
  renderAudioButtons();
  return context;
}

function maybePlayIntroFireBurst() {
  return;
}

document.addEventListener(
  "pointerdown",
  () => {
    if (!audioState.primed) {
      primeAudio();
    }
  },
  { capture: true }
);

function playAmbientTexture() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  const variants = [
    () => {
      playTone({ frequency: 196, type: "triangle", duration: 0.38, volume: 0.03, slideTo: 220 });
      playTone({ frequency: 294, type: "sine", duration: 0.28, volume: 0.02, start: 0.08 });
      playTone({ frequency: 392, type: "triangle", duration: 0.22, volume: 0.015, start: 0.14 });
    },
    () => {
      playTone({ frequency: 220, type: "sine", duration: 0.3, volume: 0.026, slideTo: 208 });
      playTone({ frequency: 330, type: "triangle", duration: 0.22, volume: 0.018, start: 0.09 });
      playTone({ frequency: 495, type: "sine", duration: 0.18, volume: 0.013, start: 0.15 });
    },
    () => {
      playTone({ frequency: 262, type: "triangle", duration: 0.2, volume: 0.022 });
      playTone({ frequency: 330, type: "sine", duration: 0.18, volume: 0.017, start: 0.05 });
      playTone({ frequency: 392, type: "triangle", duration: 0.18, volume: 0.013, start: 0.11 });
    },
    () => {
      playTone({ frequency: 147, type: "triangle", duration: 0.42, volume: 0.03, slideTo: 139 });
      playTone({ frequency: 220, type: "sine", duration: 0.24, volume: 0.018, start: 0.06 });
      playTone({ frequency: 440, type: "sine", duration: 0.14, volume: 0.012, start: 0.22 });
    },
    () => {
      playTone({ frequency: 174, type: "sine", duration: 0.2, volume: 0.022 });
      playTone({ frequency: 348, type: "triangle", duration: 0.2, volume: 0.018, start: 0.08, slideTo: 330 });
      playTone({ frequency: 522, type: "triangle", duration: 0.12, volume: 0.013, start: 0.03 });
    },
  ];

  pick(variants)();
}

function playSystemTexture() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  const variants = [
    () => {
      playTone({ frequency: 512, type: "triangle", duration: 0.09, volume: 0.02 });
      playTone({ frequency: 768, type: "sine", duration: 0.06, volume: 0.012, start: 0.04 });
    },
    () => {
      playTone({ frequency: 420, type: "sine", duration: 0.08, volume: 0.016 });
      playTone({ frequency: 640, type: "triangle", duration: 0.05, volume: 0.01, start: 0.05 });
      playNoiseBurst({ duration: 0.04, volume: 0.006, filter: 2200, q: 1.1, start: 0.01 });
    },
    () => {
      playTone({ frequency: 356, type: "triangle", duration: 0.11, volume: 0.016, slideTo: 392 });
      playTone({ frequency: 588, type: "sine", duration: 0.06, volume: 0.008, start: 0.07 });
    },
  ];

  pick(variants)();
}

function playLabIncidental() {
  if (!audioState.enabled || !audioState.musicEnabled || !state.active) {
    return;
  }

  const variants = [
    () => playSfx("lab-ping"),
    () => playSfx("lab-relay"),
    () => playSfx("lab-servo"),
    () => playSfx("lab-vent"),
    () => playSfx("lab-clang"),
    () => playSfx("lab-drop"),
    () => playSfx("lab-creak"),
    () => playSfx("lab-groan"),
    () => {
      playSfx("lab-ping");
      playTone({ frequency: 228, type: "triangle", duration: 0.08, volume: 0.012, start: 0.04 });
    },
    () => {
      playSfx("lab-relay");
      playNoiseBurst({ duration: 0.06, volume: 0.01, filter: 1680, q: 0.8, start: 0.02 });
    },
    () => {
      playSfx("lab-drop");
      playSfx("lab-relay");
    },
    () => {
      playSfx("lab-clang");
      playTone({ frequency: 142, type: "triangle", duration: 0.1, volume: 0.01, start: 0.04, slideTo: 128 });
    },
  ];

  if (state.heat >= 70 || els.coolingOverlay.classList.contains("visible")) {
    variants.push(() => {
      playSfx("lab-vent");
      playTone({ frequency: 112 + Math.random() * 12, type: "triangle", duration: 0.16, volume: 0.012, start: 0.04, slideTo: 96 });
    });
    variants.push(() => {
      playSfx("fire-crackle");
      playTone({ frequency: 154, type: "sine", duration: 0.08, volume: 0.008, start: 0.05 });
    });
    variants.push(() => {
      playSfx("lab-vent");
      playTone({ frequency: 84 + Math.random() * 10, type: "triangle", duration: 0.14, volume: 0.008, start: 0.03, slideTo: 72 });
    });
    variants.push(() => {
      playSfx("lab-groan");
      playSfx("lab-creak");
    });
  }

  if (els.scannerOverlay.classList.contains("visible") || state.scanBusy) {
    variants.push(() => {
      playSfx("lab-ping");
      playTone({ frequency: 744, type: "sine", duration: 0.05, volume: 0.012, start: 0.04 });
    });
    variants.push(() => {
      playSfx("lab-servo");
      playTone({ frequency: 904 + Math.random() * 60, type: "triangle", duration: 0.03, volume: 0.008, start: 0.05 });
    });
  }

  if (state.noiseEvent || document.body.classList.contains("signal-jam")) {
    variants.push(() => {
      playSfx("lab-relay");
      playNoiseBurst({ duration: 0.1, volume: 0.014, filter: 2300, q: 1.08 });
      playTone({ frequency: 262, type: "square", duration: 0.05, volume: 0.014, detune: -35 });
      playTone({ frequency: 330, type: "square", duration: 0.04, volume: 0.01, start: 0.06, detune: 42 });
    });
    variants.push(() => {
      playSfx("lab-ping");
      playNoiseBurst({ duration: 0.12, volume: 0.016, filter: 2680, q: 1.2 });
      playTone({ frequency: 204, type: "square", duration: 0.04, volume: 0.012, detune: -60 });
      playTone({ frequency: 404, type: "square", duration: 0.03, volume: 0.008, start: 0.05, detune: 65 });
    });
    variants.push(() => {
      playSfx("lab-clang");
      playNoiseBurst({ duration: 0.08, volume: 0.012, filter: 2100, q: 0.92, start: 0.04 });
    });
  }

  if (state.lockEvent && !state.lockEvent.resolved) {
    variants.push(() => {
      playSfx("lab-relay");
      playTone({ frequency: 214, type: "square", duration: 0.06, volume: 0.016 });
      playTone({ frequency: 214, type: "square", duration: 0.06, volume: 0.014, start: 0.12, slideTo: 186 });
      playNoiseBurst({ duration: 0.05, volume: 0.008, filter: 1800, q: 0.9, start: 0.03 });
    });
    variants.push(() => {
      playSfx("lab-servo");
      playTone({ frequency: 318, type: "square", duration: 0.05, volume: 0.012 });
      playTone({ frequency: 318, type: "square", duration: 0.05, volume: 0.01, start: 0.09 });
      playTone({ frequency: 160, type: "triangle", duration: 0.08, volume: 0.008, start: 0.04, slideTo: 144 });
    });
    variants.push(() => {
      playSfx("lab-creak");
      playSfx("lab-relay");
    });
  }

  if (audioState.mood === "critical" || audioState.mood === "danger") {
    variants.push(() => {
      playSfx("lab-ping");
      playTone({ frequency: 520, type: "triangle", duration: 0.08, volume: 0.012, slideTo: 430 });
      playTone({ frequency: 430, type: "triangle", duration: 0.08, volume: 0.01, start: 0.12, slideTo: 520 });
      playTone({ frequency: 130, type: "sine", duration: 0.18, volume: 0.008, start: 0.03 });
    });
    variants.push(() => {
      playSfx("lab-groan");
      playSfx("lab-drop");
    });
  }

  pick(variants)();
}

function playDangerBed() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  playTone({ frequency: 610, type: "triangle", duration: 0.22, volume: 0.022, slideTo: 470 });
  playTone({ frequency: 470, type: "triangle", duration: 0.22, volume: 0.018, start: 0.24, slideTo: 610 });
  playTone({ frequency: 164, type: "sine", duration: 0.28, volume: 0.018, start: 0.04, slideTo: 148 });
  playTone({ frequency: 910, type: "square", duration: 0.06, volume: 0.018, start: 0.03, slideTo: 830 });
  playNoiseBurst({ duration: 0.12, volume: 0.01, filter: 1500, q: 0.7, start: 0.05 });
}

function playPanicBed() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  playTone({ frequency: 920, type: "square", duration: 0.11, volume: 0.032, slideTo: 620 });
  playTone({ frequency: 620, type: "square", duration: 0.11, volume: 0.028, start: 0.14, slideTo: 920 });
  playTone({ frequency: 148, type: "triangle", duration: 0.28, volume: 0.026, start: 0.03, slideTo: 110 });
  playTone({ frequency: 74, type: "sine", duration: 0.42, volume: 0.022, start: 0.05, slideTo: 62 });
  playNoiseBurst({ duration: 0.16, volume: 0.02, filter: 2100, q: 1.02, start: 0.02 });
}

function playCriticalBed() {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  playTone({ frequency: 760, type: "square", duration: 0.16, volume: 0.028, slideTo: 520 });
  playTone({ frequency: 520, type: "square", duration: 0.16, volume: 0.026, start: 0.18, slideTo: 760 });
  playTone({ frequency: 118, type: "sine", duration: 0.4, volume: 0.032, start: 0.05, slideTo: 92 });
  playTone({ frequency: 236, type: "triangle", duration: 0.18, volume: 0.016, start: 0.32, slideTo: 204 });
  playTone({ frequency: 1180, type: "square", duration: 0.05, volume: 0.026, start: 0.02, slideTo: 900 });
  playNoiseBurst({ duration: 0.14, volume: 0.016, filter: 2200, q: 0.92, start: 0.04 });
}

function playHeatTexture(level = state.heat >= 88 ? "critical" : "warm") {
  if (!audioState.enabled || !audioState.musicEnabled) {
    return;
  }

  if (level === "critical") {
    playFireBurst(true);
    return;
  }

  playFireBurst(false);
}

function playMoodTransitionCue(previousMood, nextMood) {
  if (!audioState.primed || !audioState.enabled) {
    return;
  }

  if (nextMood === previousMood) {
    return;
  }

  if (nextMood === "critical") {
    playSfx("state-critical");
    return;
  }

  if (nextMood === "panic") {
    playSfx("state-panic");
    return;
  }

  if (nextMood === "danger") {
    playSfx("state-danger");
    return;
  }

  if ((previousMood === "critical" || previousMood === "danger") && (nextMood === "active" || nextMood === "idle")) {
    playSfx("state-recover");
  }
}

function refreshAudioSchedulers() {
  clearAudioSchedulers();

  if (
    !audioState.context ||
    !audioState.enabled ||
    !audioState.musicEnabled ||
    audioState.context.state !== "running" ||
    !state.active
  ) {
    return;
  }

  const scheduleAmbience = () => {
    const delay =
      audioState.mood === "panic"
        ? 1300 + Math.random() * 700
        : audioState.mood === "critical"
        ? 1700 + Math.random() * 900
        : audioState.mood === "danger"
          ? 2200 + Math.random() * 1200
          : audioState.mood === "active"
          ? 2400 + Math.random() * 1200
          : 5200 + Math.random() * 2400;
    audioState.ambienceTimer = window.setTimeout(() => {
      if (audioState.mood !== "idle") {
        playAmbientTexture();
      }
      scheduleAmbience();
    }, delay);
  };

  scheduleAmbience();

  if (audioState.mood !== "idle") {
    const scheduleSystem = () => {
      const delay =
        audioState.mood === "panic"
          ? 720 + Math.random() * 520
          : audioState.mood === "critical"
          ? 980 + Math.random() * 760
          : audioState.mood === "danger"
            ? 1400 + Math.random() * 1000
            : 1800 + Math.random() * 1200;
      audioState.systemTimer = window.setTimeout(() => {
        if (audioState.mood !== "idle") {
          playSystemTexture();
          scheduleSystem();
        }
      }, delay);
    };
    scheduleSystem();
  }

  if (state.active) {
    const scheduleIncidental = () => {
      const delay =
        state.noiseEvent || (state.lockEvent && !state.lockEvent.resolved)
          ? 1700 + Math.random() * 1200
          : audioState.mood === "panic"
            ? 1500 + Math.random() * 900
            : audioState.mood === "critical"
            ? 1900 + Math.random() * 1200
            : audioState.mood === "danger"
              ? 2400 + Math.random() * 1500
              : 2800 + Math.random() * 1800;
      audioState.incidentalTimer = window.setTimeout(() => {
        if (state.active && audioState.enabled && audioState.musicEnabled) {
          playLabIncidental();
          scheduleIncidental();
        }
      }, delay);
    };
    scheduleIncidental();
  }

  if (audioState.mood === "panic") {
    const scheduleAlarm = () => {
      audioState.alarmTimer = window.setTimeout(() => {
        if (audioState.mood === "panic") {
          playPanicBed();
          scheduleAlarm();
        }
      }, 900);
    };
    scheduleAlarm();
  } else if (audioState.mood === "critical") {
    const scheduleAlarm = () => {
      audioState.alarmTimer = window.setTimeout(() => {
        if (audioState.mood === "critical") {
          playCriticalBed();
          scheduleAlarm();
        }
      }, 1500);
    };
    scheduleAlarm();
  } else if (audioState.mood === "danger") {
    const scheduleAlarm = () => {
      audioState.alarmTimer = window.setTimeout(() => {
        if (audioState.mood === "danger") {
          playDangerBed();
          scheduleAlarm();
        }
      }, 2600);
    };
    scheduleAlarm();
  }

  if (state.heat >= 70) {
    const scheduleHeat = () => {
      const delay =
        state.heat >= 88
          ? 900 + Math.random() * 650
          : 1700 + Math.random() * 1000;
      audioState.heatTimer = window.setTimeout(() => {
        if (state.heat >= 70) {
          playHeatTexture(state.heat >= 88 ? "critical" : "warm");
          scheduleHeat();
        }
      }, delay);
    };
    scheduleHeat();
  }
}

function syncAudioMood(mood = "idle") {
  const previousMood = audioState.mood;
  audioState.mood = mood;
  if (!audioState.context) {
    return;
  }

  const now = audioState.context.currentTime;
  const masterTarget = audioState.enabled ? 1 : 0.0001;
  const musicTarget =
    audioState.enabled && audioState.musicEnabled
      ? state.active
        ? mood === "panic"
          ? 0.56
          : mood === "critical"
          ? 0.48
          : mood === "danger"
            ? 0.4
            : mood === "active"
              ? 0.32
              : 0.22
        : 0.16
      : 0.0001;
  const baseTarget = state.active
    ? mood === "panic" ? 0.22 : mood === "critical" ? 0.18 : mood === "danger" ? 0.145 : mood === "active" ? 0.11 : 0.075
    : 0.0001;
  const pulseTarget = state.active
    ? mood === "panic" ? 0.11 : mood === "critical" ? 0.082 : mood === "danger" ? 0.06 : mood === "active" ? 0.038 : 0.018
    : 0.0001;
  const noiseTarget = state.active
    ? mood === "panic" ? 0.1 : mood === "critical" ? 0.078 : mood === "danger" ? 0.056 : mood === "active" ? 0.034 : 0.018
    : 0.0001;
  const airTarget = state.active
    ? mood === "panic" ? 0.085 : mood === "critical" ? 0.068 : mood === "danger" ? 0.048 : mood === "active" ? 0.032 : 0.018
    : 0.0001;
  const rattleTarget = state.active
    ? mood === "panic" ? 0.05 : mood === "critical" ? 0.038 : mood === "danger" ? 0.026 : mood === "active" ? 0.014 : 0.004
    : 0.0001;
  const fireTarget = 0.0001;
  const menuPadTarget =
    audioState.enabled && audioState.musicEnabled
      ? !state.active
        ? 0.05
        : mood === "panic"
          ? 0.016
          : mood === "critical"
            ? 0.014
            : mood === "danger"
              ? 0.012
              : 0.018
      : 0.0001;
  const menuShineTarget =
    audioState.enabled && audioState.musicEnabled
      ? !state.active
        ? 0.026
        : mood === "panic"
          ? 0.007
          : mood === "critical"
            ? 0.006
            : mood === "danger"
              ? 0.005
              : 0.009
      : 0.0001;

  audioState.master.gain.cancelScheduledValues(now);
  audioState.master.gain.setTargetAtTime(masterTarget, now, 0.18);
  audioState.musicGain.gain.cancelScheduledValues(now);
  audioState.musicGain.gain.setTargetAtTime(musicTarget, now, 0.22);
  audioState.ambientBaseGain.gain.cancelScheduledValues(now);
  audioState.ambientBaseGain.gain.setTargetAtTime(baseTarget, now, 0.24);
  audioState.ambientPulseGain.gain.cancelScheduledValues(now);
  audioState.ambientPulseGain.gain.setTargetAtTime(pulseTarget, now, 0.24);
  audioState.ambientNoiseGain.gain.cancelScheduledValues(now);
  audioState.ambientNoiseGain.gain.setTargetAtTime(noiseTarget, now, 0.28);
  audioState.ambientAirGain.gain.cancelScheduledValues(now);
  audioState.ambientAirGain.gain.setTargetAtTime(airTarget, now, 0.28);
  audioState.ambientRattleGain.gain.cancelScheduledValues(now);
  audioState.ambientRattleGain.gain.setTargetAtTime(rattleTarget, now, 0.3);
  audioState.fireBedGain.gain.cancelScheduledValues(now);
  audioState.fireBedGain.gain.setTargetAtTime(fireTarget, now, 0.36);
  audioState.menuPadGain.gain.cancelScheduledValues(now);
  audioState.menuPadGain.gain.setTargetAtTime(menuPadTarget, now, 0.38);
  audioState.menuShineGain.gain.cancelScheduledValues(now);
  audioState.menuShineGain.gain.setTargetAtTime(menuShineTarget, now, 0.42);
  refreshAudioSchedulers();
  syncFireLoop();
  playMoodTransitionCue(previousMood, mood);
}

function playTone({
  frequency,
  type = "sine",
  duration = 0.18,
  volume = 0.06,
  attack = 0.01,
  start = 0,
  slideTo = null,
  detune = 0,
}) {
  if (!audioState.context || !audioState.enabled || audioState.context.state !== "running") {
    return;
  }

  const oscillator = audioState.context.createOscillator();
  const gain = audioState.context.createGain();
  const now = audioState.context.currentTime + start;
  const endAt = now + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.detune.setValueAtTime(detune, now);
  if (slideTo) {
    oscillator.frequency.linearRampToValueAtTime(slideTo, endAt);
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

  oscillator.connect(gain);
  gain.connect(audioState.fxGain);
  oscillator.start(now);
  oscillator.stop(endAt + 0.04);
}

function playNoiseBurst({
  duration = 0.12,
  volume = 0.018,
  filter = 1200,
  q = 0.8,
  start = 0,
  type = "bandpass",
}) {
  if (!audioState.context || !audioState.enabled || audioState.context.state !== "running") {
    return;
  }

  const now = audioState.context.currentTime + start;
  const source = audioState.context.createBufferSource();
  source.buffer = createNoiseBuffer(audioState.context, Math.max(0.4, duration + 0.12));
  const filterNode = audioState.context.createBiquadFilter();
  filterNode.type = type;
  filterNode.frequency.setValueAtTime(filter, now);
  filterNode.Q.value = q;
  const gain = audioState.context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filterNode);
  filterNode.connect(gain);
  gain.connect(audioState.fxGain);
  source.start(now);
  source.stop(now + duration + 0.08);
}

function playSfx(kind) {
  if (!audioState.enabled) {
    return;
  }

  switch (kind) {
    case "state-danger":
      if (playSample("warning", { volume: 1.06, randomRate: 0.03 })) {
        playTone({ frequency: 164, type: "sine", duration: 0.16, volume: 0.012, start: 0.05, slideTo: 150 });
        break;
      }
      playTone({ frequency: 540, type: "triangle", duration: 0.18, volume: 0.06, slideTo: 430 });
      playTone({ frequency: 430, type: "triangle", duration: 0.18, volume: 0.05, start: 0.19, slideTo: 540 });
      playTone({ frequency: 164, type: "sine", duration: 0.28, volume: 0.02, start: 0.03, slideTo: 150 });
      playNoiseBurst({ duration: 0.12, volume: 0.018, filter: 1800, q: 0.72, start: 0.02 });
      break;
    case "state-critical":
      if (playSample("critical", { volume: 1.1, randomRate: 0.02 })) {
        playTone({ frequency: 118, type: "triangle", duration: 0.2, volume: 0.016, start: 0.03, slideTo: 98 });
        break;
      }
      playTone({ frequency: 820, type: "square", duration: 0.16, volume: 0.082, slideTo: 600 });
      playTone({ frequency: 600, type: "square", duration: 0.16, volume: 0.072, start: 0.17, slideTo: 820 });
      playTone({ frequency: 118, type: "triangle", duration: 0.34, volume: 0.036, start: 0.02, slideTo: 96 });
      playNoiseBurst({ duration: 0.14, volume: 0.028, filter: 2100, q: 1.05, start: 0.02 });
      break;
    case "state-panic":
      playTone({ frequency: 960, type: "square", duration: 0.12, volume: 0.048, slideTo: 640 });
      playTone({ frequency: 640, type: "square", duration: 0.12, volume: 0.042, start: 0.13, slideTo: 960 });
      playTone({ frequency: 152, type: "triangle", duration: 0.28, volume: 0.024, start: 0.02, slideTo: 116 });
      playNoiseBurst({ duration: 0.12, volume: 0.02, filter: 2300, q: 1.02, start: 0.02 });
      break;
    case "state-recover":
      playTone({ frequency: 520, type: "triangle", duration: 0.16, volume: 0.05, slideTo: 340 });
      playTone({ frequency: 340, type: "sine", duration: 0.16, volume: 0.034, start: 0.06, slideTo: 440 });
      break;
    case "boot":
      playTone({ frequency: 180, type: "sine", duration: 0.22, volume: 0.045, slideTo: 260 });
      playTone({ frequency: 260, type: "triangle", duration: 0.2, volume: 0.03, start: 0.12, slideTo: 320 });
      playNoiseBurst({ duration: 0.12, volume: 0.008, filter: 1800, q: 0.6, start: 0.02 });
      break;
    case "success":
      playTone({ frequency: 392, type: "triangle", duration: 0.18, volume: 0.05 });
      playTone({ frequency: 523, type: "sine", duration: 0.24, volume: 0.035, start: 0.05 });
      break;
    case "damage":
      playTone({ frequency: 180, type: "sawtooth", duration: 0.22, volume: 0.048, slideTo: 110 });
      playTone({ frequency: 96, type: "triangle", duration: 0.28, volume: 0.032, start: 0.04, slideTo: 70 });
      break;
    case "glitch":
      playTone({ frequency: 240, type: "square", duration: 0.08, volume: 0.026, detune: -30 });
      playTone({ frequency: 188, type: "square", duration: 0.08, volume: 0.024, start: 0.06, detune: 40 });
      playNoiseBurst({ duration: 0.08, volume: 0.016, filter: 2400, q: 1.1 });
      break;
    case "scan-start":
      if (playSample("scan-start", { volume: 1.04, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 290, type: "triangle", duration: 0.14, volume: 0.05, slideTo: 346 });
      playTone({ frequency: 430, type: "sine", duration: 0.08, volume: 0.022, start: 0.04 });
      playTone({ frequency: 620, type: "triangle", duration: 0.07, volume: 0.018, start: 0.02, slideTo: 700 });
      playNoiseBurst({ duration: 0.1, volume: 0.02, filter: 1500, q: 0.7, start: 0.01 });
      break;
    case "scan-pulse":
      if (playSample("scan-pulse", { volume: 1, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 760, type: "sine", duration: 0.06, volume: 0.03, slideTo: 600 });
      playTone({ frequency: 356, type: "triangle", duration: 0.09, volume: 0.02, start: 0.03, slideTo: 312 });
      playNoiseBurst({ duration: 0.04, volume: 0.01, filter: 2600, q: 1.1, start: 0.01 });
      break;
    case "scan-done":
      if (playSample("scan-done", { volume: 1.04, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 310, type: "triangle", duration: 0.14, volume: 0.05 });
      playTone({ frequency: 415, type: "sine", duration: 0.18, volume: 0.044, start: 0.07 });
      playTone({ frequency: 622, type: "triangle", duration: 0.12, volume: 0.02, start: 0.12 });
      break;
    case "scanner-open":
      playTone({ frequency: 188, type: "triangle", duration: 0.12, volume: 0.03, slideTo: 244 });
      playTone({ frequency: 412, type: "sine", duration: 0.08, volume: 0.018, start: 0.04 });
      playTone({ frequency: 620, type: "triangle", duration: 0.07, volume: 0.012, start: 0.09 });
      break;
    case "scanner-close":
      playTone({ frequency: 420, type: "sine", duration: 0.08, volume: 0.014, slideTo: 280 });
      playNoiseBurst({ duration: 0.04, volume: 0.006, filter: 1600, q: 0.7, start: 0.01 });
      break;
    case "notes-open":
      playTone({ frequency: 240, type: "triangle", duration: 0.08, volume: 0.016 });
      playTone({ frequency: 360, type: "triangle", duration: 0.08, volume: 0.012, start: 0.04 });
      playNoiseBurst({ duration: 0.05, volume: 0.008, filter: 1800, q: 0.9, start: 0.01 });
      break;
    case "notes-close":
      playTone({ frequency: 360, type: "sine", duration: 0.06, volume: 0.01, slideTo: 248 });
      break;
    case "cooling-open":
      playTone({ frequency: 148, type: "triangle", duration: 0.14, volume: 0.02, slideTo: 124 });
      playNoiseBurst({ duration: 0.1, volume: 0.016, filter: 980, q: 0.42, start: 0.01 });
      break;
    case "cooling-close":
      playTone({ frequency: 220, type: "sine", duration: 0.08, volume: 0.01, slideTo: 170 });
      break;
    case "dev-open":
      playTone({ frequency: 290, type: "square", duration: 0.06, volume: 0.014 });
      playTone({ frequency: 420, type: "triangle", duration: 0.06, volume: 0.012, start: 0.04 });
      break;
    case "dev-close":
      playTone({ frequency: 320, type: "triangle", duration: 0.05, volume: 0.008, slideTo: 250 });
      break;
    case "noise-open":
      playNoiseBurst({ duration: 0.12, volume: 0.022, filter: 2400, q: 1.1 });
      playTone({ frequency: 280, type: "square", duration: 0.08, volume: 0.022, detune: -40 });
      playTone({ frequency: 510, type: "square", duration: 0.07, volume: 0.018, start: 0.06, detune: 25 });
      break;
    case "noise-close":
      playTone({ frequency: 520, type: "triangle", duration: 0.08, volume: 0.014, slideTo: 340 });
      break;
    case "noise-lock":
      playTone({ frequency: 620, type: "triangle", duration: 0.05, volume: 0.026 });
      playTone({ frequency: 840, type: "sine", duration: 0.04, volume: 0.012, start: 0.03 });
      break;
    case "noise-miss":
      playTone({ frequency: 180, type: "square", duration: 0.08, volume: 0.024, slideTo: 142 });
      playNoiseBurst({ duration: 0.06, volume: 0.016, filter: 1800, q: 1.1, start: 0.01 });
      break;
    case "critical":
      if (playSample("critical", { volume: 1.14, randomRate: 0.02 })) {
        playNoiseBurst({ duration: 0.08, volume: 0.01, filter: 2400, q: 1.08, start: 0.04 });
        break;
      }
      playTone({ frequency: 780, type: "square", duration: 0.12, volume: 0.05 });
      playTone({ frequency: 540, type: "square", duration: 0.16, volume: 0.038, start: 0.13 });
      playTone({ frequency: 390, type: "triangle", duration: 0.18, volume: 0.024, start: 0.28, slideTo: 340 });
      playNoiseBurst({ duration: 0.14, volume: 0.026, filter: 2200, q: 0.9 });
      break;
    case "ignite":
      if (playSample("ignite", { volume: 1.5, randomRate: 0.08 })) {
        playTone({ frequency: 138, type: "sine", duration: 0.12, volume: 0.016, start: 0.04, slideTo: 122 });
        break;
      }
      playNoiseBurst({ duration: 0.14, volume: 0.026, filter: 1650, q: 0.72 });
      playTone({ frequency: 192, type: "triangle", duration: 0.12, volume: 0.026, slideTo: 282 });
      playTone({ frequency: 132, type: "sine", duration: 0.14, volume: 0.016, start: 0.03, slideTo: 118 });
      break;
    case "fire-crackle":
      if (playSample("fire-crackle", { volume: 1.7, randomRate: 0.1 })) {
        playTone({ frequency: 126, type: "sine", duration: 0.08, volume: 0.012, start: 0.03, slideTo: 118 });
        break;
      }
      playNoiseBurst({ duration: 0.16, volume: 0.024, filter: 1900, q: 0.86 });
      playNoiseBurst({ duration: 0.08, volume: 0.016, filter: 2850, q: 1.2, start: 0.06 });
      playTone({ frequency: 144, type: "triangle", duration: 0.1, volume: 0.018, start: 0.03, slideTo: 130 });
      break;
    case "utility":
      playTone({ frequency: 246, type: "triangle", duration: 0.15, volume: 0.03 });
      playTone({ frequency: 310, type: "sine", duration: 0.15, volume: 0.024, start: 0.05 });
      break;
    case "utility-coolant":
      if (playSample("utility-coolant", { volume: 1.18, randomRate: 0.05 })) {
        playTone({ frequency: 132, type: "sine", duration: 0.08, volume: 0.01, start: 0.03, slideTo: 118 });
        break;
      }
      playTone({ frequency: 172, type: "triangle", duration: 0.14, volume: 0.026, slideTo: 140 });
      playNoiseBurst({ duration: 0.12, volume: 0.016, filter: 980, q: 0.44, start: 0.01 });
      playTone({ frequency: 284, type: "sine", duration: 0.08, volume: 0.012, start: 0.06, slideTo: 248 });
      break;
    case "utility-intel":
      if (playSample("utility-intel", { volume: 1.12, randomRate: 0.04 })) {
        playTone({ frequency: 980, type: "sine", duration: 0.04, volume: 0.008, start: 0.18 });
        break;
      }
      playTone({ frequency: 352, type: "triangle", duration: 0.08, volume: 0.022 });
      playTone({ frequency: 528, type: "sine", duration: 0.08, volume: 0.018, start: 0.04 });
      playTone({ frequency: 792, type: "triangle", duration: 0.05, volume: 0.012, start: 0.09 });
      break;
    case "utility-shield":
      if (playSample("utility-shield", { volume: 1.16, randomRate: 0.03 })) {
        playTone({ frequency: 602, type: "triangle", duration: 0.06, volume: 0.009, start: 0.08 });
        break;
      }
      playTone({ frequency: 228, type: "square", duration: 0.1, volume: 0.022 });
      playTone({ frequency: 342, type: "triangle", duration: 0.12, volume: 0.016, start: 0.05 });
      playNoiseBurst({ duration: 0.07, volume: 0.01, filter: 1800, q: 0.9, start: 0.01 });
      break;
    case "utility-stasis":
      if (playSample("utility-stasis", { volume: 1.1, randomRate: 0.03 })) {
        playTone({ frequency: 184, type: "sine", duration: 0.12, volume: 0.01, start: 0.11, slideTo: 164 });
        break;
      }
      playTone({ frequency: 264, type: "sine", duration: 0.12, volume: 0.02, slideTo: 220 });
      playTone({ frequency: 396, type: "triangle", duration: 0.16, volume: 0.014, start: 0.03, slideTo: 330 });
      playTone({ frequency: 198, type: "sine", duration: 0.18, volume: 0.01, start: 0.08 });
      break;
    case "lab-ping":
      if (playSample("lab-ping", { volume: 1.3, randomRate: 0.02 })) {
        break;
      }
      playTone({ frequency: 880, type: "sine", duration: 0.06, volume: 0.026 });
      playTone({ frequency: 520, type: "triangle", duration: 0.12, volume: 0.016, start: 0.03, slideTo: 460 });
      break;
    case "lab-relay":
      if (playSample("lab-relay", { volume: 1.28, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 210, type: "triangle", duration: 0.07, volume: 0.024 });
      playNoiseBurst({ duration: 0.05, volume: 0.016, filter: 1820, q: 0.84, start: 0.01 });
      break;
    case "lab-vent":
      if (playSample("lab-vent", { volume: 1.22, randomRate: 0.03 })) {
        break;
      }
      playNoiseBurst({ duration: 0.18, volume: 0.02, filter: 1080, q: 0.42 });
      playTone({ frequency: 112, type: "triangle", duration: 0.14, volume: 0.012, start: 0.04, slideTo: 98 });
      break;
    case "lab-servo":
      if (playSample("lab-servo", { volume: 1.24, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 210, type: "triangle", duration: 0.11, volume: 0.022, slideTo: 320 });
      playTone({ frequency: 980, type: "sine", duration: 0.03, volume: 0.01, start: 0.06 });
      break;
    case "ui-soft":
      playTone({ frequency: 248, type: "sine", duration: 0.07, volume: 0.012 });
      playTone({ frequency: 372, type: "triangle", duration: 0.07, volume: 0.009, start: 0.03 });
      break;
    case "ui-strong":
      playTone({ frequency: 228, type: "triangle", duration: 0.08, volume: 0.018 });
      playTone({ frequency: 342, type: "sine", duration: 0.09, volume: 0.012, start: 0.04 });
      break;
    case "panel-open":
      if (playSample("panel-open", { volume: 1, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 182, type: "triangle", duration: 0.14, volume: 0.034, slideTo: 254 });
      playTone({ frequency: 254, type: "triangle", duration: 0.14, volume: 0.026, start: 0.05, slideTo: 324 });
      playNoiseBurst({ duration: 0.07, volume: 0.014, filter: 1300, q: 0.56, start: 0.02 });
      break;
    case "panel-close":
      if (playSample("panel-close", { volume: 0.96, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 312, type: "sine", duration: 0.09, volume: 0.018, slideTo: 214 });
      playNoiseBurst({ duration: 0.05, volume: 0.008, filter: 1100, q: 0.5, start: 0.01 });
      break;
    case "terminal-open":
      if (playSample("terminal-open", { volume: 1.16, randomRate: 0.04 })) {
        break;
      }
      playNoiseBurst({ duration: 0.1, volume: 0.016, filter: 1950, q: 0.9, start: 0.01 });
      playTone({ frequency: 136, type: "triangle", duration: 0.12, volume: 0.026, slideTo: 226 });
      playTone({ frequency: 226, type: "sine", duration: 0.12, volume: 0.02, start: 0.06, slideTo: 330 });
      playTone({ frequency: 940, type: "triangle", duration: 0.03, volume: 0.008, start: 0.14 });
      break;
    case "terminal-close":
      if (playSample("terminal-close", { volume: 1.04, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 308, type: "triangle", duration: 0.1, volume: 0.014, slideTo: 92 });
      playNoiseBurst({ duration: 0.06, volume: 0.008, filter: 1300, q: 0.62, start: 0.01 });
      break;
    case "terminal-key":
      if (playSample("terminal-key", { volume: 1.06, randomRate: 0.08 })) {
        break;
      }
      playTone({ frequency: 1240, type: "square", duration: 0.014, volume: 0.018 });
      playTone({ frequency: 820, type: "square", duration: 0.012, volume: 0.011, start: 0.008 });
      break;
    case "crisis-start":
      playTone({ frequency: 184, type: "triangle", duration: 0.16, volume: 0.02 });
      playTone({ frequency: 276, type: "sine", duration: 0.12, volume: 0.014, start: 0.05 });
      playNoiseBurst({ duration: 0.05, volume: 0.008, filter: 1700, q: 0.8, start: 0.02 });
      break;
    case "terminal-send":
      if (playSample("terminal-send", { volume: 1.06, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 302, type: "square", duration: 0.06, volume: 0.024 });
      playTone({ frequency: 228, type: "square", duration: 0.06, volume: 0.018, start: 0.04 });
      playTone({ frequency: 454, type: "triangle", duration: 0.06, volume: 0.012, start: 0.02 });
      playNoiseBurst({ duration: 0.05, volume: 0.012, filter: 2600, q: 1.2, start: 0.01 });
      break;
    case "warning":
      if (playSample("warning", { volume: 1.04, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 480, type: "triangle", duration: 0.12, volume: 0.032 });
      playTone({ frequency: 360, type: "triangle", duration: 0.12, volume: 0.024, start: 0.12 });
      playNoiseBurst({ duration: 0.1, volume: 0.014, filter: 1900, q: 0.8 });
      break;
    case "heartbeat":
      playTone({ frequency: 96, type: "sine", duration: 0.12, volume: 0.024 });
      playTone({ frequency: 86, type: "sine", duration: 0.16, volume: 0.018, start: 0.11 });
      break;
    case "verdict-good":
      playTone({ frequency: 262, type: "triangle", duration: 0.1, volume: 0.018 });
      playTone({ frequency: 392, type: "sine", duration: 0.14, volume: 0.016, start: 0.05 });
      break;
    case "verdict-bad":
      playTone({ frequency: 196, type: "sawtooth", duration: 0.13, volume: 0.02, slideTo: 160 });
      playTone({ frequency: 132, type: "triangle", duration: 0.18, volume: 0.014, start: 0.06 });
      break;
    case "lock-open":
      playTone({ frequency: 330, type: "triangle", duration: 0.12, volume: 0.026 });
      playTone({ frequency: 494, type: "sine", duration: 0.15, volume: 0.022, start: 0.06 });
      break;
    case "lock-deny":
      playTone({ frequency: 170, type: "square", duration: 0.09, volume: 0.02 });
      playTone({ frequency: 142, type: "square", duration: 0.09, volume: 0.016, start: 0.07 });
      playNoiseBurst({ duration: 0.09, volume: 0.012, filter: 1400, q: 0.85 });
      break;
    case "terminal-system":
      if (playSample("terminal-system", { volume: 1, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 312, type: "triangle", duration: 0.06, volume: 0.022 });
      playTone({ frequency: 520, type: "sine", duration: 0.05, volume: 0.016, start: 0.02 });
      break;
    case "terminal-good":
      if (playSample("terminal-good", { volume: 1.02, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 420, type: "triangle", duration: 0.08, volume: 0.03 });
      playTone({ frequency: 650, type: "sine", duration: 0.07, volume: 0.022, start: 0.03 });
      break;
    case "terminal-alert":
      if (playSample("terminal-alert", { volume: 1.04, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 250, type: "square", duration: 0.07, volume: 0.032 });
      playTone({ frequency: 170, type: "square", duration: 0.06, volume: 0.024, start: 0.04 });
      playNoiseBurst({ duration: 0.07, volume: 0.018, filter: 1800, q: 1 });
      break;
    case "cooling-start":
      if (playSample("cooling-start", { volume: 1.1, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 148, type: "triangle", duration: 0.16, volume: 0.024, slideTo: 132 });
      playNoiseBurst({ duration: 0.12, volume: 0.018, filter: 900, q: 0.45 });
      break;
    case "cooling-loop":
      if (playSample("cooling-loop", { volume: 1.04, randomRate: 0.06 })) {
        break;
      }
      playTone({ frequency: 118, type: "sine", duration: 0.12, volume: 0.012, slideTo: 110 });
      playNoiseBurst({ duration: 0.14, volume: 0.016, filter: 1100, q: 0.42 });
      break;
    case "cooling-stop":
      if (playSample("cooling-stop", { volume: 0.96, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 210, type: "sine", duration: 0.08, volume: 0.01, slideTo: 176 });
      break;
    case "heat-pop":
      if (playSample("heat-pop", { volume: 1.16, randomRate: 0.06 })) {
        break;
      }
      playNoiseBurst({ duration: 0.09, volume: 0.01, filter: 2400, q: 1.06 });
      playTone({ frequency: 164, type: "triangle", duration: 0.08, volume: 0.008, start: 0.03, slideTo: 148 });
      break;
    case "cooling-safe":
      playTone({ frequency: 248, type: "triangle", duration: 0.08, volume: 0.012 });
      playTone({ frequency: 372, type: "sine", duration: 0.1, volume: 0.01, start: 0.04 });
      break;
    case "outcome-perfect":
      if (playSample("outcome-perfect", { volume: 1.12, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 262, type: "triangle", duration: 0.18, volume: 0.026 });
      playTone({ frequency: 392, type: "triangle", duration: 0.18, volume: 0.024, start: 0.08 });
      playTone({ frequency: 523, type: "sine", duration: 0.24, volume: 0.022, start: 0.18 });
      break;
    case "outcome-salvaged":
      if (playSample("outcome-salvaged", { volume: 1.08, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 220, type: "triangle", duration: 0.16, volume: 0.024 });
      playTone({ frequency: 330, type: "sine", duration: 0.18, volume: 0.018, start: 0.1 });
      playTone({ frequency: 440, type: "triangle", duration: 0.14, volume: 0.012, start: 0.22 });
      break;
    case "outcome-damaged":
      if (playSample("outcome-damaged", { volume: 1.08, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 164, type: "triangle", duration: 0.18, volume: 0.024 });
      playTone({ frequency: 246, type: "sine", duration: 0.18, volume: 0.016, start: 0.12 });
      break;
    case "outcome-fail":
      if (playSample("outcome-fail", { volume: 1.08, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 184, type: "square", duration: 0.14, volume: 0.022, slideTo: 122 });
      playNoiseBurst({ duration: 0.08, volume: 0.012, filter: 1600, q: 0.88, start: 0.01 });
      break;
    case "outcome-meltdown":
      if (playSample("outcome-meltdown", { volume: 1.12, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 302, type: "square", duration: 0.14, volume: 0.03, slideTo: 210 });
      playTone({ frequency: 86, type: "triangle", duration: 0.3, volume: 0.024, start: 0.05, slideTo: 68 });
      playNoiseBurst({ duration: 0.14, volume: 0.018, filter: 1250, q: 0.7, start: 0.02 });
      break;
    case "outcome-timeout":
      if (playSample("outcome-timeout", { volume: 1.08, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 780, type: "square", duration: 0.05, volume: 0.014 });
      playTone({ frequency: 780, type: "square", duration: 0.05, volume: 0.014, start: 0.12 });
      playTone({ frequency: 240, type: "triangle", duration: 0.18, volume: 0.016, start: 0.16, slideTo: 120 });
      break;
    case "outcome-collapse":
      if (playSample("outcome-collapse", { volume: 1.1, randomRate: 0.03 })) {
        break;
      }
      playTone({ frequency: 148, type: "triangle", duration: 0.28, volume: 0.028, slideTo: 82 });
      playTone({ frequency: 82, type: "sine", duration: 0.22, volume: 0.02, start: 0.08, slideTo: 62 });
      break;
    case "outcome-lockout":
      if (playSample("outcome-lockout", { volume: 1.08, randomRate: 0.04 })) {
        break;
      }
      playTone({ frequency: 236, type: "square", duration: 0.08, volume: 0.022 });
      playTone({ frequency: 180, type: "square", duration: 0.08, volume: 0.018, start: 0.08 });
      playNoiseBurst({ duration: 0.08, volume: 0.012, filter: 1950, q: 1, start: 0.02 });
      break;
    case "win":
      playTone({ frequency: 294, type: "triangle", duration: 0.2, volume: 0.04 });
      playTone({ frequency: 392, type: "triangle", duration: 0.2, volume: 0.034, start: 0.08 });
      playTone({ frequency: 523, type: "sine", duration: 0.28, volume: 0.03, start: 0.16 });
      break;
    case "fail":
      playTone({ frequency: 210, type: "sawtooth", duration: 0.24, volume: 0.046, slideTo: 124 });
      playTone({ frequency: 124, type: "triangle", duration: 0.34, volume: 0.032, start: 0.1, slideTo: 82 });
      break;
    default:
      break;
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(array, count) {
  return shuffle(array).slice(0, count);
}

function arraysEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((item, index) => item === right[index]);
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function appendBootLine(text, tone = "system") {
  els.bootFeed.innerHTML += `<p class="terminal-line ${tone}">[${timestamp()}] ${text}</p>`;
  els.bootFeed.scrollTop = els.bootFeed.scrollHeight;
  if (!audioState.primed || !audioState.enabled) {
    return;
  }
  if (tone === "alert") {
    playSfx("terminal-alert");
  } else if (tone === "good") {
    playSfx("terminal-good");
  } else {
    playSfx("terminal-system");
  }
}

function bootLinesForRun() {
  const preset = currentDifficulty();
  return [
    { text: "çekirdek imzası doğrulanıyor...", tone: "system", status: "Kimlik doğrulaması sürüyor..." },
    { text: `zorluk profili yüklendi // ${preset.label}`, tone: "good", status: "Operasyon profili uygulanıyor..." },
    { text: `kriz havuzu bağlandı // ${preset.crisisCount} kriz + kapanış`, tone: "system", status: "Kriz kayıtları belleğe alınıyor..." },
    { text: `tarama aralığı ayarlandı // ${preset.scanMin}-${preset.scanMax} sn`, tone: "dim", status: "Tarama alt sistemi hazırlanıyor..." },
    { text: `kritik alarm bandı // ${preset.criticalMin}-${preset.criticalMax}`, tone: "dim", status: "Alarm eşikleri kalibre ediliyor..." },
    { text: `çalışma kimliği üretildi // ${state.runId}`, tone: "good", status: "Kontrol odası senkronize ediliyor..." },
    { text: "terminal ve saha notları bağlandı", tone: "system", status: "Arayüz devralınıyor..." },
    { text: "ana kontrol ekranı açılıyor...", tone: "good", status: "Simülasyona geçiliyor..." },
  ];
}

function resetBootOverlayMeta() {
  els.bootPanel.dataset.mode = "boot";
  els.bootTag.textContent = "ÇEKİRDEK BAŞLATMA AKIŞI";
  els.bootTitle.textContent = "Simülasyon hazırlanıyor";
  els.bootStatus.textContent = "Başlatma kuyruğu oluşturuluyor...";
}

async function playBootTransition() {
  const lines = bootLinesForRun();
  resetBootOverlayMeta();
  els.bootFeed.innerHTML = "";
  els.bootProgressFill.style.width = "0%";
  playSfx("boot");
  document.body.classList.add("boot-sequence");
  setOverlay(els.bootOverlay, true);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    els.bootStatus.textContent = line.status;
    appendBootLine(line.text, line.tone);
    els.bootProgressFill.style.width = `${Math.round(((index + 1) / lines.length) * 100)}%`;
    await sleep(index === lines.length - 1 ? 820 : 360 + index * 95);
  }

  await sleep(420);
  setOverlay(els.bootOverlay, false);
  await sleep(260);
  document.body.classList.remove("boot-sequence");
}

function shutdownLinesForOutcome(profile) {
  if (profile.key === "fail") {
    return [
      { text: "çevresel koruma halkası dağılıyor...", tone: "alert", status: "Acil tahliye kanalı açılıyor..." },
      { text: "çekirdek çevresi kırmızı bölgeye kilitlendi", tone: "alert", status: "Hasar sınırı yeniden çiziliyor..." },
      { text: "kontrol odası erişimi kopma moduna alındı", tone: "system", status: "Panel bağlantıları düşürülüyor..." },
      { text: "kayıp raporu gövde çöküş iziyle mühürleniyor", tone: "alert", status: "Son kayıt hazırlanıyor..." },
    ];
  }

  return [
    { text: "operatör oturumu kapatılıyor...", tone: "system", status: "Görev kayıtları toplanıyor..." },
    { text: "reaktör günlükleri arşivleniyor", tone: "good", status: "Son kararlar mühürleniyor..." },
    { text: "saha terminalleri güvenli log off akışına geçti", tone: "system", status: "Kontrol odası kapanıyor..." },
    { text: profile.key === "perfect" ? "temiz çıkış imzası yazıldı" : "çıkış kaydı hasar notuyla kapatıldı", tone: profile.key === "perfect" ? "good" : "alert", status: "Operasyon sonucu hazırlanıyor..." },
  ];
}

function fadeOutAmbientBed() {
  if (!audioState.context) {
    return;
  }
  const now = audioState.context.currentTime;
  audioState.musicGain.gain.cancelScheduledValues(now);
  audioState.musicGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.ambientBaseGain.gain.cancelScheduledValues(now);
  audioState.ambientBaseGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.ambientPulseGain.gain.cancelScheduledValues(now);
  audioState.ambientPulseGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.ambientNoiseGain.gain.cancelScheduledValues(now);
  audioState.ambientNoiseGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.ambientAirGain.gain.cancelScheduledValues(now);
  audioState.ambientAirGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.ambientRattleGain.gain.cancelScheduledValues(now);
  audioState.ambientRattleGain.gain.setTargetAtTime(0.0001, now, 0.12);
  audioState.fireBedGain.gain.cancelScheduledValues(now);
  audioState.fireBedGain.gain.setTargetAtTime(0.0001, now, 0.12);
  if (audioState.menuPadGain) {
    audioState.menuPadGain.gain.cancelScheduledValues(now);
    audioState.menuPadGain.gain.setTargetAtTime(0.0001, now, 0.12);
  }
  if (audioState.menuShineGain) {
    audioState.menuShineGain.gain.cancelScheduledValues(now);
    audioState.menuShineGain.gain.setTargetAtTime(0.0001, now, 0.12);
  }
  if (audioState.fireLoop) {
    audioState.fireLoop.volume = 0;
    audioState.fireLoop.pause();
  }
  clearAudioSchedulers();
}

async function playShutdownTransition(profile) {
  const failed = profile.key === "fail";
  playSfx(outcomeCue(profile));
  els.bootPanel.dataset.mode = failed ? "failure" : "shutdown";
  els.bootTag.textContent = failed ? "REAKTÖR ÇÖKÜŞÜ // TAHLİYE" : "OTURUM SONLANDIRMA // LOG OFF";
  els.bootTitle.textContent = failed ? "Kontrol odası düşüyor" : "Görev kaydı sonlandırılıyor";
  els.bootFeed.innerHTML = "";
  els.bootProgressFill.style.width = "0%";
  els.bootStatus.textContent = failed ? "Çöküş akışı hazırlanıyor..." : "Çıkış akışı hazırlanıyor...";
  document.body.classList.add(failed ? "failure-sequence" : "shutdown-sequence");
  setOverlay(els.bootOverlay, true);

  const lines = shutdownLinesForOutcome(profile);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    els.bootStatus.textContent = line.status;
    appendBootLine(line.text, line.tone);
    els.bootProgressFill.style.width = `${Math.round(((index + 1) / lines.length) * 100)}%`;
    await sleep(index === lines.length - 1 ? 780 : 420 + index * 90);
  }

  await sleep(520);
  setOverlay(els.bootOverlay, false);
  await sleep(240);
  document.body.classList.remove("shutdown-sequence", "failure-sequence");
  resetBootOverlayMeta();
}

function queueEndGame(success, text, delay = FINAL_REVEAL_DELAY) {
  if (state.ending || state.endQueued) {
    return;
  }

  if (!state.runFinishedAt) {
    state.runFinishedAt = Date.now();
  }
  state.endQueued = true;
  state.active = false;
  state.booting = false;
  clearInterval(state.timerId);
  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);
  state.scanBusy = false;
  state.lockEvent = null;
  els.scanButton.disabled = false;

  window.setTimeout(() => {
    state.endQueued = false;
    endGame(success, text);
  }, delay);
}

function outcomeProfile(success, text) {
  if (state.tutorialMode) {
    if (!success) {
      return {
        key: "fail",
        tag: "EĞİTİM SONUCU // KESİLDİ",
        title: "Eğitim Yarıda Kaldı",
        text,
      };
    }

    return {
      key: "perfect",
      tag: "EĞİTİM SONUCU // TAMAMLANDI",
      title: "Eğitim Tamamlandı",
      text: "Eğitim turu bitti. Temel ekran okuma, tarama ve denge kararını başarıyla tamamladın.",
    };
  }

  if (!success) {
    return {
      key: "fail",
      tag: "OPERASYON SONUCU // KAYIP",
      title: "Reaktör Kaybedildi",
      text,
    };
  }

  const mistakes = state.mistakes.length;
  const limit = mistakeLimit();

  if (mistakes === 0 && state.stability >= 70) {
    return {
      key: "perfect",
      tag: "OPERASYON SONUCU // TEMİZ KAPANIŞ",
      title: "Reaktör Kurtarıldı",
      text: "Çalışma tamamlandı. Reaktör turu, kapanış zinciri ve karar akışı temiz biçimde ayakta kaldı.",
    };
  }

  if (mistakes <= Math.max(1, Math.floor(limit / 2)) && state.stability >= 40) {
    return {
      key: "salvaged",
      tag: "OPERASYON SONUCU // ZOR KURTARMA",
      title: "Reaktör Zor Kurtarıldı",
      text: "Tur tamamlandı ama sistem birkaç ciddi darbeyle çıktı. Reaktör ayakta, kayıtlar hasarlı.",
    };
  }

  return {
    key: "damaged",
    tag: "OPERASYON SONUCU // HASARLI ÇIKIŞ",
    title: "Hasarlı Çıkış",
    text: "Kapanış sırası tamamlandı ama yanlış müdahaleler yüzünden sistem temiz kurtarma veremedi.",
  };
}

function outcomeCue(profile) {
  if (profile.key === "perfect") {
    return "outcome-perfect";
  }
  if (profile.key === "salvaged") {
    return "outcome-salvaged";
  }
  if (profile.key === "damaged") {
    return "outcome-damaged";
  }

  const lowered = String(profile.text || "").toLowerCase();
  if (lowered.includes("ısı") || lowered.includes("gövde") || lowered.includes("dağıldı")) {
    return "outcome-meltdown";
  }
  if (lowered.includes("süre")) {
    return "outcome-timeout";
  }
  if (lowered.includes("stabilite") || lowered.includes("kararlılık")) {
    return "outcome-collapse";
  }
  if (lowered.includes("kilit") || lowered.includes("pencere")) {
    return "outcome-lockout";
  }
  return "outcome-fail";
}

function playOutcomeReveal(profile) {
  if (!audioState.primed || !audioState.enabled) {
    return;
  }

  const cue = outcomeCue(profile);
  playSfx("panel-open");

  if (cue === "outcome-perfect") {
    if (playSample("outcome-perfect", { volume: 1.22, randomRate: 0.02 })) {
      playTone({ frequency: 660, type: "sine", duration: 0.16, volume: 0.016, start: 0.18 });
      return;
    }
  } else if (cue === "outcome-salvaged") {
    if (playSample("outcome-salvaged", { volume: 1.18, randomRate: 0.02 })) {
      playTone({ frequency: 520, type: "triangle", duration: 0.12, volume: 0.014, start: 0.16 });
      return;
    }
  } else if (cue === "outcome-damaged") {
    if (playSample("outcome-damaged", { volume: 1.18, randomRate: 0.02 })) {
      playTone({ frequency: 188, type: "triangle", duration: 0.14, volume: 0.014, start: 0.14, slideTo: 164 });
      return;
    }
  } else if (cue === "outcome-meltdown") {
    if (playSample("outcome-meltdown", { volume: 1.2, randomRate: 0.02 })) {
      playNoiseBurst({ duration: 0.1, volume: 0.012, filter: 1500, q: 0.72, start: 0.08 });
      return;
    }
  } else if (cue === "outcome-timeout") {
    if (playSample("outcome-timeout", { volume: 1.18, randomRate: 0.02 })) {
      playTone({ frequency: 960, type: "square", duration: 0.04, volume: 0.01, start: 0.14 });
      return;
    }
  } else if (cue === "outcome-collapse") {
    if (playSample("outcome-collapse", { volume: 1.2, randomRate: 0.02 })) {
      playTone({ frequency: 78, type: "sine", duration: 0.18, volume: 0.012, start: 0.12, slideTo: 64 });
      return;
    }
  } else if (cue === "outcome-lockout") {
    if (playSample("outcome-lockout", { volume: 1.16, randomRate: 0.02 })) {
      playTone({ frequency: 220, type: "square", duration: 0.06, volume: 0.012, start: 0.12 });
      return;
    }
  } else if (playSample("outcome-fail", { volume: 1.16, randomRate: 0.02 })) {
    playTone({ frequency: 172, type: "square", duration: 0.08, volume: 0.012, start: 0.1 });
    return;
  }

  playSfx(cue);
}

function buildOutcomeStatsMarkup() {
  const startedAt = state.runStartedAt || Date.now();
  const finishedAt = state.runFinishedAt || Date.now();
  const elapsedSeconds = Math.max(0, Math.round((finishedAt - startedAt) / 1000));
  const totalTime = currentDifficulty().time;
  const consumedTime = Math.max(0, totalTime - state.timeLeft);
  const seenCrises = Math.max(0, Math.min(state.currentIndex + 1, state.crises.length));

  const items = [
    { label: "Geçen Süre", value: `${formatElapsedLabel(elapsedSeconds)} (${elapsedSeconds} sn)` },
    { label: "Simülasyon Süresi", value: `${consumedTime} sn` },
    { label: "Doğru Müdahale", value: `${state.stats.successCount}` },
    { label: "Yanlış Kayıt", value: `${state.mistakes.length}` },
    { label: "Tarama", value: `${state.stats.scanCount}` },
    { label: "Yardımcı Sistem", value: `${state.stats.utilityCount}` },
    { label: "Canlı Olay", value: `${state.stats.noiseCount + state.stats.lockCount}` },
    { label: "En Yüksek Sıcaklık", value: heatKelvinLabel(state.stats.maxHeat) },
    { label: "Kalan Stabilite", value: `${state.stability}%` },
    { label: "Görülen Paket", value: `${seenCrises}/${state.crises.length}` },
  ];

  return `
    <article class="outcome-item outcome-stats">
      <strong>Genel İstatistik Raporu</strong>
      <div class="outcome-stat-grid">
        ${items
          .map(
            (item) => `
              <div class="outcome-stat">
                <span>${item.label}</span>
                <b>${item.value}</b>
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function getAtom(symbol) {
  return atoms.find((atom) => atom.symbol === symbol);
}

function electronCount(symbol, charge = 0) {
  return getAtom(symbol).number - charge;
}

function scanShellProfile(symbol, charge = 0) {
  if (charge !== 0) {
    return shellSummary(electronCount(symbol, charge));
  }

  if (symbol === "Cr") {
    return [2, 8, 13, 1];
  }
  if (symbol === "Cu") {
    return [2, 8, 18, 1];
  }

  return shellSummary(electronCount(symbol, 0));
}

function shellDistributionText(shells) {
  return shells.map((value, index) => `${shellLabels[index]}:${value}`).join(" / ");
}

function shellSummary(electrons) {
  let remaining = electrons;
  const shells = [0, 0, 0, 0];
  for (const orbital of orbitalFlow) {
    if (remaining <= 0) {
      break;
    }
    const used = Math.min(orbital.capacity, remaining);
    shells[orbital.n - 1] += used;
    remaining -= used;
  }
  return shells.filter((value) => value > 0);
}

function outerElectronCount(electrons) {
  const shells = shellSummary(electrons);
  return shells[shells.length - 1];
}

function filledShellCount(electrons) {
  return shellSummary(electrons).length;
}

function timestamp() {
  return clockFormatter.format(new Date());
}

function formatElapsedLabel(totalSeconds) {
  const safeSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function flashDamage() {
  playSfx("damage");
  els.stabilityCard?.classList.add("damage-hit");
  els.stabilityStrip?.classList.add("damage-hit");
  document.body.classList.add("flash", "shake");
  window.setTimeout(() => els.stabilityCard?.classList.remove("damage-hit"), 360);
  window.setTimeout(() => els.stabilityStrip?.classList.remove("damage-hit"), 420);
  window.setTimeout(() => document.body.classList.remove("flash"), 220);
  window.setTimeout(() => document.body.classList.remove("shake"), 240);
}

function flashGood() {
  playSfx("success");
  els.stabilityCard?.classList.add("success-hit");
  els.stabilityStrip?.classList.add("success-hit");
  document.body.classList.add("good-flash", "shake");
  document.body.classList.add("reward-pop");
  window.setTimeout(() => els.stabilityCard?.classList.remove("success-hit"), 360);
  window.setTimeout(() => els.stabilityStrip?.classList.remove("success-hit"), 420);
  window.setTimeout(() => document.body.classList.remove("good-flash"), 220);
  window.setTimeout(() => document.body.classList.remove("shake"), 180);
  window.setTimeout(() => document.body.classList.remove("reward-pop"), 520);
}

function pulseGlitch() {
  playSfx("glitch");
  document.body.classList.add("glitch-hit");
  window.setTimeout(() => document.body.classList.remove("glitch-hit"), 560);
}

function setOverlay(element, visible) {
  if (!element) {
    return;
  }
  if (element === els.scannerOverlay && !visible && tutorialScannerCloseLocked()) {
    syncTutorialScannerLock();
    return;
  }
  const changed = element.classList.contains("visible") !== visible;
  element.classList.toggle("visible", visible);
  if (changed && state.tutorialMode && element === els.scannerOverlay) {
    notifyTutorialTrigger(visible ? "scannerOpen" : "scannerClosed");
  }
  if (!changed || !audioState.primed) {
    return;
  }

  if (element === els.scannerOverlay) {
    playSfx(visible ? "terminal-open" : "terminal-close");
    playSfx(visible ? "scanner-open" : "scanner-close");
    return;
  }

  if (element === els.notesOverlay) {
    playSfx(visible ? "terminal-open" : "terminal-close");
    playSfx(visible ? "notes-open" : "notes-close");
    return;
  }

  if (element === els.coolingOverlay) {
    playSfx(visible ? "cooling-open" : "cooling-close");
    playSfx(visible ? "panel-open" : "panel-close");
    return;
  }

  if (element === els.noiseOverlay) {
    playSfx(visible ? "noise-open" : "noise-close");
    return;
  }

  if (element === els.lockOverlay) {
    playSfx(visible ? "warning" : "panel-close");
    return;
  }
}

function playTerminalKeypress(event) {
  return;
}

function logLine(text, tone = "system") {
  state.terminalLines.push({ text: `[${timestamp()}] ${text}`, tone });
  state.terminalLines = state.terminalLines.slice(-120);
  els.terminalFeed.innerHTML = state.terminalLines
    .map((line) => `<p class="terminal-line ${line.tone}">${line.text}</p>`)
    .join("");
  els.terminalFeed.scrollTop = els.terminalFeed.scrollHeight;

  if (!audioState.primed || !audioState.enabled || tone === "dim") {
    return;
  }

  const now = performance.now();
  if (now - audioState.lastLogAt < 70) {
    return;
  }
  audioState.lastLogAt = now;
  if (tone === "alert") {
    playSfx("terminal-alert");
  } else if (tone === "good") {
    playSfx("terminal-good");
  } else {
    playSfx("terminal-system");
  }
}

function flashHeat() {
  els.heatCard?.classList.add("heat-hit");
  window.setTimeout(() => els.heatCard?.classList.remove("heat-hit"), 360);
}

function heatState() {
  const safeBand = currentSafeBand();
  if (state.heat >= 88) {
    return "critical";
  }
  if (state.heat >= 70) {
    return "warm";
  }
  if (state.heat >= safeBand.min && state.heat <= safeBand.max) {
    return "safe";
  }
  if (state.heat > safeBand.max) {
    return "watch";
  }
  return "cool";
}

function heatKelvin(value) {
  return Math.round(value + 273);
}

function heatKelvinLabel(value) {
  return `${heatKelvin(value)} K`;
}

function heatText() {
  const safeBand = currentSafeBand();
  if (state.coolingActive) {
    return "Tahliye açık. Çekirdek ısı yükü zorla düşürülüyor; panel açıkken ana kriz akışı seni beklemiyor.";
  }
  if (state.heat >= 88) {
    return "Çekirdek kırmızı bandın içinde. Soğutma kontrolüne hemen dönmezsen gövde stabilitesi erir.";
  }
  if (state.heat >= 70) {
    return "Isı güvenli bandın üstüne çıktı. Bu seviyede oyalanmak pasif hasara dönüşebilir.";
  }
  if (state.heat > safeBand.max) {
    return "Isı yükseliyor. Birkaç kriz daha beklersen soğutma paneline dönmek gerekecek.";
  }
  if (state.heat >= safeBand.min) {
    return "Çekirdek güvenli bantta. Şimdilik yalnız izleme yeterli.";
  }
  return "Çekirdek serin bölgede. Şu an soğutma müdahalesi gerekmiyor.";
}

function renderCoolingPanel() {
  if (!els.coolingFill) {
    return;
  }

  const percentage = Math.max(0, Math.min(100, state.heat));
  const safeBand = currentSafeBand();
  const heatMode = heatState();
  els.coolingFill.style.width = `${percentage}%`;
  els.coolingNeedle.style.left = `${percentage}%`;
  if (els.coolingSafeBand) {
    els.coolingSafeBand.style.left = `${safeBand.min}%`;
    els.coolingSafeBand.style.width = `${Math.max(4, safeBand.max - safeBand.min)}%`;
  }
  if (els.coolingSafeLabel) {
    els.coolingSafeLabel.textContent = `Güvenli bant ${heatKelvinLabel(safeBand.min)} - ${heatKelvinLabel(safeBand.max)}`;
  }
  els.coolingText.textContent = `${heatText()} Anlık değer: ${heatKelvinLabel(state.heat)}.`;
  els.coolingStatus.dataset.state = heatMode === "cool" ? "safe" : heatMode;
  els.coolingStatus.textContent =
    state.coolingActive
      ? "Tahliye Açık"
      : heatMode === "critical"
        ? "Kritik Isı"
        : heatMode === "warm"
          ? "Yüksek Isı"
          : heatMode === "safe"
            ? "Güvenli Bant"
            : "İzleme";
  els.coolingHold.classList.toggle("active", state.coolingActive);
}

function stopCoolingHold(playStop = true) {
  if (state.coolingIntervalId) {
    clearInterval(state.coolingIntervalId);
    state.coolingIntervalId = null;
  }
  if (state.coolingActive && playStop) {
    playSfx("cooling-stop");
  }
  state.coolingActive = false;
  renderCoolingPanel();
}

function playFireBurst(intense = false) {
  if (!audioState.primed || !audioState.enabled) {
    return;
  }

  if (audioState.fireLoop) {
    syncFireLoop();
    return;
  }

  playSample("fire-crackle", { volume: intense ? 2.3 : 1.95, randomRate: 0.08 });
  playNoiseBurst({
    duration: intense ? 0.32 : 0.24,
    volume: intense ? 0.03 : 0.022,
    filter: intense ? 720 : 560,
    q: 0.28,
    type: "lowpass",
  });
  playNoiseBurst({
    duration: intense ? 0.2 : 0.16,
    volume: intense ? 0.022 : 0.016,
    filter: intense ? 1480 : 1220,
    q: 0.64,
    type: "bandpass",
    start: 0.01,
  });
  playNoiseBurst({
    duration: intense ? 0.12 : 0.08,
    volume: intense ? 0.014 : 0.01,
    filter: intense ? 2360 : 2140,
    q: 1.06,
    start: 0.06,
  });

  if (intense) {
    playSample("ignite", { volume: 2.1, randomRate: 0.05 });
    playNoiseBurst({ duration: 0.14, volume: 0.016, filter: 2780, q: 1.08, start: 0.08 });
    playNoiseBurst({ duration: 0.16, volume: 0.018, filter: 940, q: 0.42, type: "lowpass", start: 0.03 });
  }
}

function triggerHeatCrackle(force = false) {
  const now = performance.now();
  const minGap = state.heat >= 88 ? 420 : 820;
  if (!force && now - state.lastHeatCrackleAt < minGap) {
    return;
  }
  state.lastHeatCrackleAt = now;
  playFireBurst(state.heat >= 88 || force);
}

function coolingDeltaForHeat(heat = state.heat) {
  const safeBand = currentSafeBand();
  const factor = currentDifficulty().coolingFactor ?? 1;
  if (heat > safeBand.max) {
    return -1.8 * factor;
  }
  if (heat > safeBand.min) {
    return -1.05 * factor;
  }
  return -0.6 * factor;
}

function changeHeat(delta, options = {}) {
  const previous = state.heat;
  const next = Math.max(0, Math.min(100, previous + delta));
  if (next === previous) {
    return previous;
  }

  state.heat = next;
  state.stats.maxHeat = Math.max(state.stats.maxHeat, next);
  if (delta > 0 && !options.quietVisual) {
    flashHeat();
  }

  if (delta > 0 && next >= 70) {
    triggerHeatCrackle(previous < 70 || previous < 88 && next >= 88);
  }

  if (previous < 70 && next >= 70) {
    playSfx("ignite");
    playSfx("warning");
    logLine("Çekirdek ısısı güvenli bandı aştı. Soğutma kontrolü açılmalı.", "alert");
  }

  if (previous < 88 && next >= 88) {
    playSfx("critical");
    playSfx("ignite");
    playSfx("heat-pop");
    pulseGlitch();
    logLine("Çekirdek ısısı kırmızı banda girdi. Gövde yükü tehlikeli seviyede.", "alert");
  }

  if (previous < scannerHeatCutoff() && next >= scannerHeatCutoff()) {
    abortScanForHeat();
  }

  const safeBand = currentSafeBand();
  if (options.fromCooling && previous > safeBand.max && next <= safeBand.max) {
    playSfx("cooling-safe");
    logLine("Çekirdek ısısı yeniden güvenli banda çekildi.", "good");
  }

  renderCoolingPanel();
  renderScannerState();
  if (!options.skipHud) {
    updateHud();
  }
  if (state.active) {
    syncTaskNotice();
  }

  if (state.active && next >= 100) {
    queueEndGame(false, "Çekirdek ısısı kontrol dışına çıktı. Reaktör gövdesi dağıldı.");
  }

  return next;
}

function nextNoiseDelay() {
  const preset = currentDifficulty();
  const base =
    preset.noiseMin + Math.floor(Math.random() * (preset.noiseMax - preset.noiseMin + 1));

  if (state.heat >= 88) {
    return Math.max(6, Math.round(base * 0.34));
  }
  if (state.heat >= 70) {
    return Math.max(9, Math.round(base * 0.58));
  }
  return base;
}

function scheduleNoiseEvent() {
  state.noiseCountdown = nextNoiseDelay();
}

function noisePressureForHeat() {
  if (state.heat >= 88) {
    return 3.4;
  }
  if (state.heat >= 70) {
    return 2.1;
  }
  return 1;
}

function buildNoiseFrequencyEvent() {
  return {
    mode: "frequency",
    tag: "CANLI OLAY // PARAZİT DALGASI",
    title: "Sinyal Kirlenmesi",
    text: pick([
      "Ana akış görüntüsü parazit aldı. Hareketli frekans çizgisini güvenli banda birkaç kez kilitlemen gerekiyor.",
      "Saha ekranı sinyal gürültüsüyle karardı. İmleci bant içine alıp birkaç kez frekans sabitle.",
      "Kontrol camı parazitle doldu. Hareketli çizgiyi güvenli pencereye denk getirerek ekranı temizle.",
    ]),
    progress: 0,
    required: randomInt(1, 4),
    position: 0.16 + Math.random() * 0.4,
    velocity: 0.016,
    windowStart: 0.36,
    windowWidth: 0.18,
    hitPadding: 0.02,
    timingPadding: 0.01,
    buttonLabel: "Frekansı Kilitle",
  };
}

function buildNoiseMatchEvent(mode) {
  const pool =
    mode === "pipes"
      ? [
          { key: "delta", label: "hat Δ" },
          { key: "sigma", label: "hat Σ" },
          { key: "omega", label: "hat Ω" },
          { key: "phi", label: "hat Φ" },
          { key: "psi", label: "hat Ψ" },
          { key: "xi", label: "hat Ξ" },
        ]
      : [
          { key: "ax7", label: "AX-7" },
          { key: "mn2", label: "MN-2" },
          { key: "qr4", label: "QR-4" },
          { key: "lt9", label: "LT-9" },
          { key: "vk3", label: "VK-3" },
          { key: "ps6", label: "PS-6" },
        ];
  const pairCount = randomInt(3, 4);
  const source = [...pool];
  const selected = Array.from({ length: pairCount }, () => randomItem(source));
  return {
    mode,
    tag: mode === "pipes" ? "CANLI OLAY // SOĞUTMA HATTI" : "CANLI OLAY // KABLO DÜĞÜMÜ",
    title: mode === "pipes" ? "Boru Eşleştirmesi" : "Kablo Bağlantısı",
    text:
      mode === "pipes"
        ? "Soğutma hattı yönleri karıştı. Sol girişleri doğru çıkışlarla eşleştirip akışı geri kur."
        : "Saha kabloları düştü. Sol taraftaki kabloları doğru portlarla yeniden bağla.",
    progress: 0,
    required: pairCount,
    items: selected,
    leftOrder: shuffle(selected.map((item) => item.key)),
    rightOrder: shuffle(selected.map((item) => item.key)),
    matched: [],
    selectedLeft: null,
    selectedRight: null,
    buttonLabel: "Seçimi Temizle",
  };
}

function stopNoiseMotion() {
  if (state.noiseMotionId) {
    clearInterval(state.noiseMotionId);
    state.noiseMotionId = null;
  }
}

function reseedNoiseBand(initial = false) {
  if (!state.noiseEvent) {
    return;
  }
  state.noiseEvent.feedback = "";
  state.noiseEvent.windowWidth = initial ? 0.18 : 0.12 + Math.random() * 0.05;
  state.noiseEvent.windowStart = 0.12 + Math.random() * (0.82 - state.noiseEvent.windowWidth);
  state.noiseEvent.velocity = (initial ? 0.015 : 0.017 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1);
}

function pulseNoiseFeedback(kind) {
  const target = els.noiseTuner || els.noiseButton;
  if (!target) {
    return;
  }
  const className = kind === "good" ? "noise-hit" : "noise-miss";
  target.classList.remove("noise-hit", "noise-miss");
  void target.offsetWidth;
  target.classList.add(className);
  window.setTimeout(() => target.classList.remove(className), 240);
}

function startNoiseMotion() {
  stopNoiseMotion();
  state.noiseMotionId = window.setInterval(() => {
    if (!state.noiseEvent) {
      stopNoiseMotion();
      return;
    }
    state.noiseEvent.position += state.noiseEvent.velocity;
    if (state.noiseEvent.position >= 0.98) {
      state.noiseEvent.position = 0.98;
      state.noiseEvent.velocity *= -1;
    } else if (state.noiseEvent.position <= 0.02) {
      state.noiseEvent.position = 0.02;
      state.noiseEvent.velocity *= -1;
    }
    renderNoiseSteps();
  }, 34);
}

function renderNoiseSteps() {
  if (!els.noiseSteps) {
    return;
  }
  const progress = state.noiseEvent?.progress || 0;
  const required = state.noiseEvent?.required || 4;
  const mode = state.noiseEvent?.mode || "frequency";
  const isFrequencyMode = mode === "frequency";
  els.noiseSteps.innerHTML = Array.from({ length: required }, (_, index) => {
    const active = index < progress;
    if (mode === "frequency") {
      return `<div class="noise-step ${active ? "active" : ""}">${active ? "temiz" : "parazit"}</div>`;
    }
    return `<div class="noise-step ${active ? "active" : ""}"></div>`;
  }).join("");
  els.noiseSteps.classList.toggle("hidden", !isFrequencyMode);
  els.noiseButton.classList.toggle("hidden", !isFrequencyMode);
  if (!state.noiseEvent) {
    els.noiseReadout.textContent = "İmleci güvenli banda getirip kilitle.";
    els.noiseTuner?.classList.remove("hidden");
    els.noiseMatchArea?.classList.add("hidden");
    return;
  }

  els.noiseTag.textContent = state.noiseEvent.tag;
  els.noiseTitle.textContent = state.noiseEvent.title;
  els.noiseText.textContent = state.noiseEvent.text;
  els.noiseButton.textContent = state.noiseEvent.buttonLabel || "Frekansı Kilitle";

  if (mode === "frequency" && els.noiseWindow) {
    els.noiseTuner?.classList.remove("hidden");
    els.noiseMatchArea?.classList.add("hidden");
    els.noiseWindow.style.left = `${state.noiseEvent.windowStart * 100}%`;
    els.noiseWindow.style.width = `${state.noiseEvent.windowWidth * 100}%`;
    els.noiseCursor.style.left = `${state.noiseEvent.position * 100}%`;
    els.noiseReadout.textContent =
      state.noiseEvent.feedback || `İmleci güvenli banda getirip kilitle. ${progress}/${required} hat temizlendi.`;
    return;
  }

  els.noiseTuner?.classList.add("hidden");
  els.noiseMatchArea?.classList.remove("hidden");
  els.noiseReadout.textContent =
    mode === "pipes"
      ? `Sol hattı seç, sonra doğru çıkışı bağla. ${progress}/${required} hat kuruldu.`
      : `Sol kabloyu seç, sonra doğru portu bağla. ${progress}/${required} bağlantı tamamlandı.`;
  renderNoiseMatchArea();
}

function renderNoiseMatchArea() {
  if (!els.noiseMatchLeft || !els.noiseMatchRight || !state.noiseEvent || state.noiseEvent.mode === "frequency") {
    return;
  }

  const { leftOrder = [], rightOrder = [], matched = [], selectedLeft, selectedRight, items = [] } = state.noiseEvent;
  const itemMap = new Map(items.map((item) => [item.key, item.label]));
  els.noiseMatchLeft.innerHTML = leftOrder
    .map((key) => {
      const matchedState = matched.includes(key);
      return `<button class="noise-port ${matchedState ? "matched" : ""} ${selectedLeft === key ? "selected" : ""}" data-side="left" data-key="${key}" ${matchedState ? "disabled" : ""}>${itemMap.get(key) || key}</button>`;
    })
    .join("");
  els.noiseMatchRight.innerHTML = rightOrder
    .map((key) => {
      const matchedState = matched.includes(key);
      return `<button class="noise-port ${matchedState ? "matched" : ""} ${selectedRight === key ? "selected" : ""}" data-side="right" data-key="${key}" ${matchedState ? "disabled" : ""}>${itemMap.get(key) || key}</button>`;
    })
    .join("");
}

function resetNoiseSelection() {
  if (!state.noiseEvent || state.noiseEvent.mode === "frequency") {
    return;
  }
  state.noiseEvent.selectedLeft = null;
  state.noiseEvent.selectedRight = null;
  renderNoiseMatchArea();
}

function resolveNoiseMatch(side, key) {
  if (!state.active || !state.noiseEvent || state.noiseEvent.mode === "frequency" || state.noiseEvent.resolving) {
    return;
  }

  if (state.noiseEvent.matched.includes(key)) {
    return;
  }

  if (side === "left") {
    state.noiseEvent.selectedLeft = key;
    state.noiseEvent.selectedRight = null;
    renderNoiseMatchArea();
    return;
  }

  if (!state.noiseEvent.selectedLeft) {
    state.noiseEvent.selectedRight = key;
    renderNoiseMatchArea();
    return;
  }

  if (state.noiseEvent.selectedLeft === key) {
    state.noiseEvent.matched.push(key);
    state.noiseEvent.progress += 1;
    state.noiseEvent.selectedLeft = null;
    state.noiseEvent.selectedRight = null;
    playSfx("noise-lock");
    playSfx("terminal-good");
    renderNoiseSteps();
    if (state.noiseEvent.progress >= state.noiseEvent.required) {
      logLine(
        state.noiseEvent.mode === "pipes"
          ? "Soğutma hatları eşleşti. Akış düzeni geri kuruldu."
          : "Kablo bağlantıları toparlandı. Saha hattı yeniden çalışıyor.",
        "good"
      );
      clearNoiseEvent(true);
    }
    return;
  }

  state.timeLeft = Math.max(0, state.timeLeft - 2);
  applyPenalty(-2, true, { skipHeat: true });
  state.noiseEvent.selectedRight = key;
  playSfx("noise-miss");
  playSfx("terminal-alert");
  logLine(
    state.noiseEvent.mode === "pipes"
      ? "Yanlış boru hattı denendi. Akış hâlâ karışık."
      : "Yanlış kablo porta gitti. Hat yeniden denenecek.",
    "alert"
  );
  renderNoiseMatchArea();
  window.setTimeout(() => {
    if (!state.noiseEvent || state.noiseEvent.resolving || state.noiseEvent.mode === "frequency") {
      return;
    }
    state.noiseEvent.selectedLeft = null;
    state.noiseEvent.selectedRight = null;
    renderNoiseMatchArea();
  }, 260);
}

function clearNoiseEvent(playClear = false) {
  if (state.noiseEvent) {
    state.noiseEvent.resolving = true;
  }
  els.noiseButton.disabled = true;
  stopNoiseMotion();

  const finalize = () => {
    state.noiseEvent = null;
    document.body.classList.remove("signal-jam");
    els.noisePanel.classList.remove("opening", "resolving");
    setOverlay(els.noiseOverlay, false);
    els.noiseButton.disabled = false;
    renderNoiseSteps();
    scheduleNoiseEvent();
    syncAudioMood(currentAudioMood());
  };

  if (playClear && audioState.primed) {
    playSfx("scan-done");
  }

  if (playClear && els.noiseOverlay.classList.contains("visible")) {
    els.noisePanel.classList.remove("opening");
    els.noisePanel.classList.add("resolving");
    window.setTimeout(finalize, 340);
    return;
  }

  finalize();
}

function triggerNoiseEvent() {
  if (!state.active || state.noiseEvent || state.ending || state.booting) {
    return;
  }

  state.stats.noiseCount += 1;
  const variant = pick(["frequency", "pipes", "cables"]);
  state.noiseEvent =
    variant === "frequency"
      ? buildNoiseFrequencyEvent()
      : buildNoiseMatchEvent(variant);
  if (variant === "frequency") {
    reseedNoiseBand(true);
    document.body.classList.add("signal-jam");
  } else {
    document.body.classList.remove("signal-jam");
  }
  renderNoiseSteps();
  if (variant === "frequency") {
    startNoiseMotion();
  } else {
    stopNoiseMotion();
  }
  els.noisePanel.classList.remove("resolving");
  void els.noisePanel.offsetWidth;
  els.noisePanel.classList.add("opening");
  setOverlay(els.noiseOverlay, true);
  window.setTimeout(() => els.noisePanel.classList.remove("opening"), 420);
  playSfx("glitch");
  playSfx("warning");
  logLine(
    variant === "frequency"
      ? "Canlı olay: ekran paraziti ana paneli kısa süreli bozdu."
      : variant === "pipes"
        ? "Canlı olay: soğutma hattı eşleşmesi bozuldu."
        : "Canlı olay: saha kabloları yerinden çıktı.",
    "alert"
  );
  syncAudioMood(currentAudioMood());
}

function resolveNoiseStep() {
  if (!state.active || !state.noiseEvent || state.noiseEvent.resolving) {
    return;
  }

  if (state.noiseEvent.mode !== "frequency") {
    resetNoiseSelection();
    return;
  }

  const cursor = state.noiseEvent.position;
  const hitPadding = state.noiseEvent.hitPadding || 0;
  const timingPadding =
    (state.noiseEvent.timingPadding || 0) + Math.abs(state.noiseEvent.velocity || 0) * 0.28;
  const hitStart = Math.max(0, state.noiseEvent.windowStart - hitPadding - timingPadding);
  const hitEnd = Math.min(
    1,
    state.noiseEvent.windowStart + state.noiseEvent.windowWidth + hitPadding + timingPadding
  );
  const withinBand =
    cursor >= hitStart &&
    cursor <= hitEnd;

  if (!withinBand) {
    state.timeLeft = Math.max(0, state.timeLeft - 2);
    applyPenalty(-2, true, { skipHeat: true });
    playSfx("noise-miss");
    playSfx("terminal-alert");
    state.noiseEvent.feedback = "Kilitleme bandın dışında kaldı. İmleci pencereye getirip yeniden dene.";
    logLine("Parazit temizleme zamanlaması kaçtı. Frekans hâlâ kirli.", "alert");
    if (state.noiseEvent.progress > 0) {
      state.noiseEvent.progress -= 1;
    }
    pulseNoiseFeedback("bad");
    renderNoiseSteps();
    return;
  }

  state.noiseEvent.progress += 1;
  state.noiseEvent.feedback = `Kilit oturdu. ${state.noiseEvent.progress}/${state.noiseEvent.required} hat temizlendi.`;
  reseedNoiseBand();
  renderNoiseSteps();
  playSfx("noise-lock");
  playSfx("terminal-good");
  pulseNoiseFeedback("good");
  if (state.noiseEvent.progress >= state.noiseEvent.required) {
    logLine("Parazit temizlendi. Görüntü netliğe döndü.", "good");
    clearNoiseEvent(true);
  }
}

async function requestNoiseResolve(event) {
  if (event) {
    event.preventDefault();
  }
  await primeAudio();
  const now = performance.now();
  if (now - state.lastNoiseResolveAt < 110) {
    return;
  }
  state.lastNoiseResolveAt = now;
  resolveNoiseStep();
}

function currentAudioMood() {
  if (!state.active) {
    return "idle";
  }

  if (stackedCriticalCount() >= 1) {
    return "panic";
  }

  if (state.currentCrisis?.severity === "kritik" || state.heat >= 88) {
    return "critical";
  }

  if (
    state.noiseEvent ||
    (state.lockEvent && !state.lockEvent.resolved) ||
    state.stability < 42 ||
    state.timeLeft <= 36 ||
    state.heat >= 70
  ) {
    return "danger";
  }

  return "active";
}

function stackedCriticalCount() {
  let count = 0;
  if (timeHudState() === "critical") {
    count += 1;
  }
  if (stabilityHudState() === "critical") {
    count += 1;
  }
  if (heatHudState() === "critical") {
    count += 1;
  }
  return count;
}

function timeHudState() {
  if (state.timeLeft <= 14) {
    return "critical";
  }
  if (state.timeLeft <= 36) {
    return "warn";
  }
  return "normal";
}

function stabilityHudState() {
  if (state.stability <= 25) {
    return "critical";
  }
  if (state.stability <= 45) {
    return "warn";
  }
  return "normal";
}

function heatHudState() {
  if (state.heat >= 88) {
    return "critical";
  }
  if (state.heat >= 70) {
    return "warn";
  }
  return "normal";
}

function updateHeatBloom() {
  const safeBand = currentSafeBand();
  const start = Math.min(92, Math.max(0, safeBand.max + 6));
  const span = Math.max(16, 100 - start);
  const intensity = Math.max(0, Math.min(1, (state.heat - start) / span));
  const opacity = intensity <= 0 ? 0 : 0.12 + intensity * 0.62;
  const blur = 15 - intensity * 6;
  const shift = 16 - intensity * 16;
  const saturate = 1.04 + intensity * 0.34;

  document.body.style.setProperty("--heat-bloom-opacity", opacity.toFixed(3));
  document.body.style.setProperty("--heat-bloom-blur", `${blur.toFixed(2)}px`);
  document.body.style.setProperty("--heat-bloom-shift", `${shift.toFixed(2)}px`);
  document.body.style.setProperty("--heat-bloom-saturate", saturate.toFixed(3));
}

function updateHud() {
  els.timeValue.textContent = state.timeLeft;
  els.stabilityValue.textContent = `${Math.max(0, state.stability)}%`;
  els.heatValue.textContent = heatKelvinLabel(Math.max(0, Math.round(state.heat)));
  els.crisisValue.textContent = `${Math.max(state.currentIndex + 1, 0)} / ${state.crises.length}`;
  els.seedValue.textContent = state.runId || "----";
  els.stabilityFill.style.width = `${Math.max(0, state.stability)}%`;
  els.openCooling.classList.toggle("heat-elevated", state.heat >= 70 && state.heat < 88);
  els.openCooling.classList.toggle("heat-critical", state.heat >= 88);
  els.timeCard.dataset.state = timeHudState();
  els.stabilityCard.dataset.state = stabilityHudState();
  els.heatCard.dataset.state = heatHudState();
  updateHeatBloom();
  renderCoolingPanel();
  renderScannerState();

  if (!state.active && state.currentIndex < 0) {
    els.alarmBadge.textContent = "Beklemede";
    els.alarmBadge.dataset.severity = "bekleme";
  } else if (state.stability < 40) {
    els.alarmBadge.textContent = "Kritik Durum";
    els.alarmBadge.dataset.severity = "kritik";
  } else {
    const crisisLabels = {
      "model-shift": "Model Alarmı",
      "orbital-visual": "Görsel Tarama",
      aufbau: "Yükleme Alarmı",
      pauli: "Spin Alarmı",
      hund: "Yerleşim Alarmı",
      "quantum-card": "Kart Doğrulama",
      "ion-radius": "Geometri Alarmı",
      ionization: "Enerji Alarmı",
      "jump-table": "Veri Alarmı",
      "trend-graph": "Grafik Alarmı",
      "table-check": "Tablo Alarmı",
      "orbital-label": "Etiket Şüphesi",
      "manual-route": "Yönlendirme Alarmı",
      oxidation: "Yük Dengesi",
      "excited-state": "Hâl Alarmı",
      "block-period": "Konum Alarmı",
      isoelectronic: "İzoelektronik Alarmı",
      "valence-group": "Değerlik Alarmı",
      "orbital-energy": "Enerji Sırası",
      "tutorial-flow": "Eğitim Akışı",
      "audit-grid": "Kayıt Denetimi",
      "orbital-box": "Kutu Paneli",
      "exception-match": "İstisna Alarmı",
      "quantum-map": "Kuantum Eşleme",
      "model-filter": "İfade Tarama",
      "radius-compare": "Karşılaştırma Alarmı",
      "oxidation-step": "Değer Ayarı",
      "row-pick": "Satır Seçimi",
      "quantum-matrix": "Matris Eşleme",
      "stable-check": "Durum İncelemesi",
      "core-sync-final": "Kapanış",
    };
    const severityPrefix = {
      düşük: "Düşük",
      orta: "Orta",
      yüksek: "Yüksek",
      kritik: "Kritik",
    };
    const categoryText = crisisLabels[state.currentCrisis?.category] || "Orta Alarm";
    const severity = state.currentCrisis?.severity || "orta";
    els.alarmBadge.textContent = `${severityPrefix[severity]} ${categoryText}`;
    els.alarmBadge.dataset.severity = severity;
  }

  els.coolantCount.textContent = state.utilities.coolant;
  els.intelCount.textContent = state.utilities.intel;
  els.shieldCount.textContent = state.utilities.shield;
  els.stasisCount.textContent = state.utilities.stasis;
  document.body.classList.toggle("critical", state.stability < 40 && state.active);
  document.body.classList.toggle(
    "critical-crisis",
    state.active && state.currentCrisis?.severity === "kritik"
  );
  document.body.classList.toggle("panic-state", state.active && stackedCriticalCount() >= 1);
  document.body.classList.toggle("heat-warning", state.active && state.heat >= 70 && state.heat < 88);
  document.body.classList.toggle("heat-critical", state.active && state.heat >= 88);
  syncAudioMood(currentAudioMood());
}

function scrollToCrisisFocus() {
  window.setTimeout(() => {
    els.crisisTitle.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function showVerdict(kind, title, text) {
  if (audioState.primed) {
    if (kind === "good") {
      playSfx("verdict-good");
    } else if (kind === "bad") {
      playSfx("verdict-bad");
    }
  }
  els.verdictBox.className = `verdict-box ${kind}`;
  els.verdictTitle.textContent = title;
  els.verdictText.textContent = text;
}

function hideVerdict() {
  els.verdictBox.className = "verdict-box hidden";
  els.verdictTitle.textContent = "Sistem yorumu";
  els.verdictText.textContent = "";
}

function showTaskNotice(kind, title, text) {
  els.taskNoticeBox.className = `task-notice ${kind}`;
  els.taskNoticeTitle.textContent = title;
  els.taskNoticeText.textContent = text;
}

function hideTaskNotice() {
  els.taskNoticeBox.className = "task-notice hidden";
  els.taskNoticeTitle.textContent = "Görev uyarısı";
  els.taskNoticeText.textContent = "";
}

function syncTaskNotice() {
  if (!state.currentCrisis) {
    hideTaskNotice();
    return;
  }

  if (state.tutorialMode && state.tutorialGuide.active) {
    hideTaskNotice();
    return;
  }

  if (state.lockEvent && !state.lockEvent.resolved) {
    showTaskNotice("bad", "Panel Kilitli", "Önce canlı olay kilidini aç. Ana ekran şu an komut kabul etmiyor.");
    return;
  }

  if (state.currentCrisis.scanRequired && scannerBlockedByHeat()) {
    showTaskNotice("bad", "Tarama Çevrim Dışı", "Çekirdek ısısı tarama toleransını aştı. Tarama matrisi korumaya alındı; önce soğutma kontrolünden ısıyı düşür.");
    return;
  }

  if (state.currentCrisis.scanRequired && !hasRequiredScan()) {
    showTaskNotice("bad", "Tarama Gerekli", "Bu pakette önce ham veri toplaman gerekiyor. Tarama panelini açabilir ya da terminalden tarama na gibi bir komut çalıştırabilirsin.");
    return;
  }

  if (state.heat >= 78) {
    showTaskNotice("bad", "Çekirdek Isısı Yükseliyor", "Isı yükü güvenli bandın üstüne çıktı. Soğutma kontrolüne dönüp çekirdeği rahatlatman gerekiyor.");
    return;
  }

  const timed = currentTimedChallenge();
  if (timed && !timed.resolved && typeof timed.remaining === "number") {
    const absPenalty = Math.abs(timed.penalty);
    if (timed.remaining <= 5) {
      showTaskNotice(
        "bad",
        `Süreli Paket // Son ${timed.remaining} sn`,
        `Bu kriz kısa pencereyle geldi. ${timed.remaining} saniye içinde çözemezsen ${absPenalty} stabilite kaybedip bir sonraki pakete düşersin.`
      );
      return;
    }
    showTaskNotice(
      "timed",
      "Süreli Paket",
      `Bu krizde hızlı davranman gerekiyor. ${timed.remaining} saniyelik pencere açık; süre dolarsa ${absPenalty} stabilite kaybı gelir.`
    );
    return;
  }

  hideTaskNotice();
}

function renderEvidence(items) {
  els.evidenceBoard.innerHTML = items
    .map(
      (item) => `
        <article class="evidence-card">
          <strong>${item.label}</strong>
          <div class="evidence-value">${item.value}</div>
        </article>
      `
    )
    .join("");
}

function currentEvidence() {
  if (!state.currentCrisis) {
    return [];
  }
  return [...state.currentCrisis.evidence, ...(state.currentCrisis.extraEvidence || [])];
}

function crisisTopic(crisis) {
  const topics = {
    "model-shift": "Kuantum model / yörünge-orbital farkı",
    aufbau: "Elektron dizilimi ve Aufbau",
    pauli: "Pauli dışlama ilkesi",
    hund: "Hund kuralı",
    "quantum-card": "Kuantum sayıları",
    "ion-radius": "Atom-iyon yarıçapı",
    ionization: "İyonlaşma enerjisi",
    "jump-table": "Ardışık iyonlaşma enerjisi",
    "trend-graph": "Grafik yorumlama",
    "table-check": "Tablo tutarlılığı",
    "orbital-label": "Orbital türü / kuantum sayısı",
    "manual-route": "Orbital yönlendirme",
    "audit-grid": "Kural doğrulama",
    "orbital-box": "Orbital kutu yerleşimi",
    "exception-match": "Elektron dizilimi istisnaları",
    "quantum-map": "Kuantum sayılarından orbital kimliği",
    "model-filter": "Modern atom teorisi yorumu",
    "radius-compare": "Yarıçap karşılaştırmaları",
    "oxidation-step": "Yükseltgenme basamağı ayarı",
    "row-pick": "Tablo satırı seçimi",
    "quantum-matrix": "Kuantum etiketi eşleme",
    oxidation: "Yükseltgenme basamağı",
    "excited-state": "Temel hâl / uyarılmış hâl",
    "block-period": "Periyot ve blok",
    isoelectronic: "İzoelektronik türler ve yarıçap",
    "valence-group": "Değerlik elektronu ve grup davranışı",
    "orbital-energy": "Orbital enerji sıralaması",
    "tutorial-flow": "Temel operasyon akışı",
    "core-sync-final": "Modern atom teorisi konu zinciri",
  };
  return topics[crisis?.category] || "Modern atom teorisi";
}

function addMistake(title, reason, details = []) {
  state.mistakes.push({
    title,
    reason,
    details,
    topic: crisisTopic(state.currentCrisis),
  });
}

function fillAtomSelects() {
  const options =
    state.scanMode === "root"
      ? roots
          .map((root) => `<option value="${root.key}">${root.display}</option>`)
          .join("")
      : atoms
          .map((atom) => `<option value="${atom.symbol}">${atom.symbol} - ${atom.name}</option>`)
          .join("");
  els.scanAtomA.innerHTML = options;
}

function scannerHeatCutoff() {
  return Math.min(82, Math.max(48, currentSafeBand().max + 7));
}

function scannerBlockedByHeat() {
  return state.heat >= scannerHeatCutoff();
}

function scannerOfflineMessage() {
  return '[tarama] Çekirdek ısısı tarama toleransını aştı. Tarama matrisi korumaya alındı; önce soğutma kontrolüne dön.';
}

function renderScannerState() {
  if (!els.scanButton) {
    return;
  }

  const blocked = scannerBlockedByHeat();
  els.scanButton.disabled = state.scanBusy || blocked;

  if (blocked && !state.scanBusy) {
    els.scanMeta.textContent = "tarama çevrim dışı // yüksek ısı";
    els.scanOutput.innerHTML = `<p class="terminal-line alert">${scannerOfflineMessage()}</p>`;
    return;
  }

  if (!state.scanBusy && els.scanMeta.textContent.includes("çevrim dışı")) {
    els.scanMeta.textContent = "boşta";
    els.scanOutput.innerHTML = '<p class="terminal-line dim">[tarama] Konsol hazır.</p>';
  }
}

function abortScanForHeat() {
  if (!state.scanBusy) {
    renderScannerState();
    return;
  }

  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);
  state.scanTickId = null;
  state.scanTimeoutId = null;
  state.scanBusy = false;
  logLine("Çekirdek ısısı tarama toleransını geçti. Tarama dizisi güvenlik nedeniyle kesildi.", "alert");
  els.scanOutput.innerHTML = `<p class="terminal-line alert">${scannerOfflineMessage()}</p>`;
  renderScannerState();
}

function renderNotesSidebar() {
  els.notesSidebar.innerHTML = notesPages
    .map(
      (page, index) => `
        <button class="notes-tab ${index === state.notesPage ? "active" : ""}" data-index="${index}">
          <strong>${String(index + 1).padStart(2, "0")} // ${page.title.split("//")[1].trim()}</strong>
          <p>${page.summary}</p>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".notes-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.notesPage = Number(button.dataset.index);
      renderNotesPage();
    });
  });
}

function renderNotesPage() {
  const note = notesPages[state.notesPage];
  els.notesTitle.textContent = note.title;
  els.notesPaper.innerHTML = note.body;
  els.notesPageLabel.textContent = `${state.notesPage + 1} / ${notesPages.length}`;
  renderNotesSidebar();
}

function renderDevPanel() {
  return;
}

function toggleDevPause() {
  return;
}

function devRevealCurrent() {
  return;
}

function devSolveCurrent() {
  return;
}

function devAdjustHeat(delta) {
  return;
}

function devTriggerNoise() {
  return;
}

function devTriggerLock() {
  return;
}

function setScanMode(mode) {
  state.scanMode = mode;
  els.scanModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  els.scanChargeField.classList.toggle("hidden", mode !== "ion");
  els.scanTargetLabel.textContent = mode === "root" ? "Kök" : "Atom";
  fillAtomSelects();
}

function scanMetaText(remaining) {
  return `tarama sürüyor // ${remaining} sn kaldı`;
}

function startTimedScan(symbol, lines, logToTerminal = false) {
  state.scanBusy = true;
  els.scanButton.disabled = true;
  playSfx("scan-start");
  changeHeat(state.scanMode === "root" ? 3 : 4, { quietVisual: true, skipHud: true });
  const preset = currentDifficulty();
  const duration =
    preset.scanMin + Math.floor(Math.random() * (preset.scanMax - preset.scanMin + 1));
  let remaining = duration;
  els.scanMeta.textContent = scanMetaText(remaining);
  els.scanOutput.innerHTML = `<p class="terminal-line dim">[tarama] Veri çekiliyor... ${remaining} sn</p>`;

  if (logToTerminal) {
    logLine(`[tarama] ${symbol} taraması başladı // ${remaining} sn`, "system");
  }

  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);

  state.scanTickId = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(state.scanTickId);
      return;
    }
    playSfx("scan-pulse");
    changeHeat(state.scanMode === "root" ? 0.35 : 0.5, { quietVisual: true, skipHud: true });
    els.scanMeta.textContent = scanMetaText(remaining);
    els.scanOutput.innerHTML += `<p class="terminal-line dim">[tarama] ara örnekleme... ${remaining} sn</p>`;
    els.scanOutput.scrollTop = els.scanOutput.scrollHeight;
    if (logToTerminal) {
      logLine(`[tarama] ${symbol} // ${remaining} sn`, "dim");
    }
  }, 1000);

  state.scanTimeoutId = window.setTimeout(() => {
    state.scanBusy = false;
    els.scanButton.disabled = false;
    state.stats.scanCount += 1;
    playSfx("scan-done");
    els.scanMeta.textContent = "tarama tamamlandı";
    els.scanOutput.innerHTML = lines
      .map((line, index) => `<p class="terminal-line ${index === 0 ? "good" : "system"}">[tarama] ${line}</p>`)
      .join("");
    if (logToTerminal) {
      logLine(`[tarama] ${symbol} taraması tamamlandı.`, "good");
      lines.forEach((line, index) => logLine(`[tarama] ${line}`, index === 0 ? "good" : "system"));
    }
    attachScanIntel(symbol, lines);
    if (state.tutorialMode) {
      notifyTutorialTrigger("scanComplete");
    }
  }, duration * 1000);
}

function scannerLinesForSingle(symbol) {
  const atom = getAtom(symbol);
  const electrons = electronCount(symbol, 0);
  const shells = scanShellProfile(symbol, 0);
  return [
    `Tür: ${atom.name} (${symbol})`,
    `Proton sayısı: ${atom.number}`,
    `Elektron sayısı: ${electrons}`,
    `Dolu katman sayısı: ${shells.length}`,
    `En dış katman elektronu: ${shells[shells.length - 1]}`,
    "Elektron dizilimi: operatör tarafından yorumlanmalı.",
  ];
}

function scannerLinesForIon(symbol, charge) {
  const atom = getAtom(symbol);
  const electrons = electronCount(symbol, charge);
  const chargeText = charge > 0 ? `+${charge}` : `${charge}`;
  const shells = scanShellProfile(symbol, charge);
  return [
    `Tür: ${atom.name} (${symbol}${chargeText})`,
    `Proton sayısı: ${atom.number}`,
    `Elektron sayısı: ${electrons}`,
    `Dolu katman sayısı: ${shells.length}`,
    `En dış katman elektronu: ${shells[shells.length - 1]}`,
    charge > 0 ? "İyon durumu: pozitif, elektron kaybı var." : "İyon durumu: negatif, elektron kazanımı var.",
  ];
}

function scannerLinesForShell(symbol) {
  const atom = getAtom(symbol);
  const shells = scanShellProfile(symbol, 0);
  return [
    `Tür: ${atom.name} (${symbol})`,
    `Kabuk dağılımı: ${shells.join(" / ")}`,
    `Kabuk izi: ${shellDistributionText(shells)}`,
    `Dış katman: ${shells[shells.length - 1]} elektron`,
    "Not: bu görünüm tam dizilim vermez; yalnız katman yükünü gösterir.",
  ];
}

function scannerLinesForRoot(symbol) {
  const root = roots.find((entry) => entry.key === symbol);
  const kindLabel =
    root.kind === "asit"
      ? "asit"
      : root.kind === "kök"
        ? "çok atomlu / basit kök"
        : root.kind;
  const chargeLine =
    root.kind === "asit" ? "Net yük: nötr formül" : `Yük: ${root.charge}`;
  const usageLine =
    root.kind === "asit"
      ? "Kullanım: asitlerde ayrılan H sayısı değerlikle ilişkilidir."
      : "Kullanım: bileşiklerde kökün yükü ve değerliği birlikte düşünülür.";
  return [
    `Kök adı: ${root.name}`,
    `Formül: ${root.formula}`,
    chargeLine,
    `Değerlik: ${root.valency}`,
    `Tür: ${kindLabel}`,
    `Not: ${root.note}`,
    usageLine,
  ];
}

function attachScanIntel(symbol, lines) {
  if (!state.active || !state.currentCrisis) {
    return;
  }
  const related = state.currentCrisis.relatedSymbols || [];
  if (!related.includes(symbol)) {
    return;
  }
  state.currentCrisis.scanned = state.currentCrisis.scanned || [];
  if (state.currentCrisis.scanned.includes(symbol)) {
    return;
  }
  state.currentCrisis.scanned.push(symbol);
  state.currentCrisis.extraEvidence = state.currentCrisis.extraEvidence || [];
  state.currentCrisis.extraEvidence.push({
    label: `Ek tarama ${symbol}`,
    value: lines.slice(1, 5).join(" / "),
  });
  renderEvidence(currentEvidence());
  syncTaskNotice();
  logLine(`${symbol} taraması kriz dosyasına eklendi.`, "dim");
}

function startScan() {
  if (state.scanBusy) {
    return;
  }
  if (scannerBlockedByHeat()) {
    renderScannerState();
    logLine("Tarama çevrim dışı. Kritik ısı altında sensör dizisi korunmaya alındı.", "alert");
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }

  let lines = [];
  const symbol = els.scanAtomA.value;
  if (state.scanMode === "single") {
    lines = scannerLinesForSingle(symbol);
  } else if (state.scanMode === "root") {
    lines = scannerLinesForRoot(symbol);
  } else {
    const charge = Number(els.scanCharge.value);
    const electrons = electronCount(symbol, charge);
    if (electrons <= 0) {
      els.scanOutput.innerHTML =
        '<p class="terminal-line alert">[tarama] Geçersiz yük seçimi. Elektron sayısı fiziksel sınırın altına indi.</p>';
      return;
    }
    lines = scannerLinesForIon(symbol, charge);
  }

  startTimedScan(symbol, lines, false);
}

function startCoolingHold() {
  if (!state.active || state.coolingActive) {
    return;
  }

  state.coolingActive = true;
  renderCoolingPanel();
  playSfx("cooling-start");
  let ventStep = 0;
  state.coolingIntervalId = window.setInterval(() => {
    ventStep += 1;
    changeHeat(coolingDeltaForHeat(), { fromCooling: true });
    if (ventStep % 3 === 1) {
      playSfx("cooling-loop");
    }
  }, 195);
}

function resolveAtomToken(token) {
  return atoms.find((atom) => normalizeCommand(atom.symbol) === token);
}

function startTerminalScan(command) {
  if (state.scanBusy) {
    logLine("Tarama sistemi şu an meşgul.", "alert");
    return true;
  }

  if (scannerBlockedByHeat()) {
    renderScannerState();
    logLine("Tarama komutu reddedildi. Kritik ısı altında tarama matrisi kapanır.", "alert");
    return true;
  }

  const parts = command.split(" ").slice(1);
  if (parts.length === 0) {
    setOverlay(els.scannerOverlay, true);
    return true;
  }

  if (parts[0] === "kok") {
    const root = roots.find((entry) => normalizeCommand(entry.key) === normalizeCommand(parts[1] || ""));
    if (!root) {
      logLine("Kök tarama için örnek kullanım: tarama kok oh", "alert");
      return true;
    }
    els.scanAtomA.value = root.key;
    setScanMode("root");
    startTimedScan(root.formula, scannerLinesForRoot(root.key), true);
    return true;
  }

  const atom = resolveAtomToken(parts[0]);
  if (!atom) {
    logLine("Tanımsız giriş. Örnek kullanım: tarama na, tarama kok oh", "alert");
    return true;
  }

  let charge = 0;
  if (parts[1]) {
    charge = Number(parts[1]);
    if (Number.isNaN(charge)) {
      logLine("Yük biçimi tanınmadı. Örnek: tarama mg 2 veya tarama o -2", "alert");
      return true;
    }
  }

  let lines = [];
  if (parts[1]) {
    const electrons = electronCount(atom.symbol, charge);
    if (electrons <= 0) {
      logLine("Geçersiz yük seçimi. Elektron sayısı fiziksel sınırın altına indi.", "alert");
      return true;
    }
    lines = scannerLinesForIon(atom.symbol, charge);
  } else {
    lines = scannerLinesForSingle(atom.symbol);
    setScanMode("single");
  }

  els.scanAtomA.value = atom.symbol;
  startTimedScan(atom.symbol, lines, true);

  return true;
}

function resetSequenceArea() {
  state.sequence.selected = [];
  renderSequenceArea();
}

function resetClassifyArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "classify") {
    return;
  }
  state.classify = state.currentCrisis.classifyItems.map(() => "?");
  state.classifyReview = [];
  renderClassifyArea();
}

function resetBoxArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "box") {
    return;
  }
  state.boxState = state.currentCrisis.boxTarget.map(() => -1);
  state.boxReview = [];
  renderBoxArea();
}

function resetAssignArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "assign") {
    return;
  }
  state.assignSelections = state.currentCrisis.assignItems.map(() => "");
  state.assignReview = [];
  renderAssignArea();
}

function resetMultiArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "multi") {
    return;
  }
  state.multiSelections = state.currentCrisis.multiItems.map(() => false);
  renderMultiArea();
}

function resetCompareArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "compare") {
    return;
  }
  state.compareSelections = state.currentCrisis.compareItems.map(() => "");
  renderCompareArea();
}

function resetStepperArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "stepper") {
    return;
  }
  state.stepperValues = state.currentCrisis.stepperItems.map((item) => item.start);
  renderStepperArea();
}

function resetMatrixArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "matrix") {
    return;
  }
  state.matrixSelections = state.currentCrisis.matrixRows.map(() => "");
  renderMatrixArea();
}

function renderSequenceArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "sequence") {
    els.sequenceCurrent.innerHTML = "";
    els.sequenceBank.innerHTML = "";
    return;
  }

  const targetLength = state.currentCrisis.sequenceTarget.length;
  const selected = state.sequence.selected;
  els.sequenceCurrent.innerHTML = Array.from({ length: targetLength }, (_, index) => {
    if (!selected[index]) {
      return `<span class="sequence-target">?</span>`;
    }
    return `<button class="sequence-target filled" data-selected-index="${index}" title="Geri almak için tıkla">${selected[index]}</button>`;
  }).join("");

  els.sequenceBank.innerHTML = state.currentCrisis.sequenceBank
    .map((token) => {
      const used = selected.filter((item) => item === token).length >=
        state.currentCrisis.sequenceBank.filter((item) => item === token).length;
      return `<button class="sequence-chip ${used ? "used" : ""}" data-token="${token}" ${
        used ? "disabled" : ""
      }>${token}</button>`;
    })
    .join("");

  document.querySelectorAll(".sequence-chip").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.sequence.selected.length >= targetLength) {
        return;
      }
      state.sequence.selected.push(button.dataset.token);
      renderSequenceArea();
    });
  });

  document.querySelectorAll("[data-selected-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sequence.selected.splice(Number(button.dataset.selectedIndex), 1);
      renderSequenceArea();
    });
  });
}

function renderClassifyArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "classify") {
    els.classifyList.innerHTML = "";
    return;
  }

  els.classifyList.innerHTML = state.currentCrisis.classifyItems
    .map(
      (item, index) => {
        const truth = state.currentCrisis.classifyTarget[index];
        const current = state.classify[index];
        const review = state.classifyReview.includes(index);
        return `
        <div class="classify-row ${review ? "review-wrong" : ""}">
          <p>${item.text}</p>
          <div class="classify-choice-group">
            <button class="classify-toggle ${current === "doğru" ? "active" : ""} ${review && current === "doğru" && truth !== "doğru" ? "wrong-pick" : ""} ${review && truth === "doğru" ? "correct-answer" : ""}" data-index="${index}" data-value="doğru">D</button>
            <button class="classify-toggle ${current === "yanlış" ? "active" : ""} ${review && current === "yanlış" && truth !== "yanlış" ? "wrong-pick" : ""} ${review && truth === "yanlış" ? "correct-answer" : ""}" data-index="${index}" data-value="yanlış">Y</button>
          </div>
        </div>
      `;
      }
    )
    .join("");

  document.querySelectorAll(".classify-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const idx = Number(button.dataset.index);
      state.classify[idx] = button.dataset.value;
      state.classifyReview = state.classifyReview.filter((value) => value !== idx);
      renderClassifyArea();
    });
  });
}

function renderThreatArea() {
  const labels = {
    stabil: "Stabil // müdahale gerekmiyor",
    izle: "İzle // durum takip edilmeli",
    mudahale: "Müdahale Et // kontrollü işlem gerekli",
    kritik: "Kritik // anında işlem gerek",
  };
  els.threatReadout.textContent = state.threatLevel ? labels[state.threatLevel] : "Seçim bekleniyor";
  els.threatChoices.forEach((button) => {
    button.classList.toggle("active", button.dataset.level === state.threatLevel);
  });
}

function boxStateName(value) {
  if (value === 0) {
    return "boş";
  }
  if (value === 1) {
    return "tek";
  }
  if (value === 2) {
    return "çift";
  }
  return "?";
}

function boxStateGlyph(value) {
  if (value === 0) {
    return "∅";
  }
  if (value === 1) {
    return "↑";
  }
  if (value === 2) {
    return "↑↓";
  }
  return "?";
}

function makeBoxLine(values, labels = []) {
  return values
    .map(
      (value, index) =>
        `${labels[index] || `Kutu ${index + 1}`}: ${boxStateGlyph(value)} (${boxStateName(value)})`
    )
    .join(" / ");
}

function ensureUnlocked() {
  if (!state.lockEvent || state.lockEvent.resolved) {
    return true;
  }
  showTaskNotice("bad", "Panel Kilitli", "Önce canlı olay kilidini aç. Ana ekran şu an komut kabul etmiyor.");
  return false;
}

function renderBoxArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "box") {
    els.boxGrid.innerHTML = "";
    return;
  }

  els.boxReadout.textContent = state.currentCrisis.boxPrompt;
  els.boxGrid.innerHTML = state.boxState
    .map(
      (value, index) => `
        <article class="box-slot ${state.boxReview.includes(index) ? "review-wrong" : ""}">
          <div class="box-slot-top">
            <strong>${state.currentCrisis.boxLabels?.[index] || `Kutu ${index + 1}`}</strong>
            <span class="box-state-label"><span class="box-state-glyph">${boxStateGlyph(value)}</span>${boxStateName(value)}</span>
          </div>
          <div class="box-choice-group">
            <button class="box-toggle ${value === 0 ? "active" : ""} ${state.boxReview.includes(index) && value === 0 && state.currentCrisis.boxTarget[index] !== 0 ? "wrong-pick" : ""} ${state.boxReview.includes(index) && state.currentCrisis.boxTarget[index] === 0 ? "correct-answer" : ""}" data-index="${index}" data-value="0"><span class="box-glyph">∅</span><span class="box-copy">Boş</span></button>
            <button class="box-toggle ${value === 1 ? "active" : ""} ${state.boxReview.includes(index) && value === 1 && state.currentCrisis.boxTarget[index] !== 1 ? "wrong-pick" : ""} ${state.boxReview.includes(index) && state.currentCrisis.boxTarget[index] === 1 ? "correct-answer" : ""}" data-index="${index}" data-value="1"><span class="box-glyph">↑</span><span class="box-copy">Tek</span></button>
            <button class="box-toggle ${value === 2 ? "active" : ""} ${state.boxReview.includes(index) && value === 2 && state.currentCrisis.boxTarget[index] !== 2 ? "wrong-pick" : ""} ${state.boxReview.includes(index) && state.currentCrisis.boxTarget[index] === 2 ? "correct-answer" : ""}" data-index="${index}" data-value="2"><span class="box-glyph">↑↓</span><span class="box-copy">Çift</span></button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".box-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.boxState[index] = Number(button.dataset.value);
      state.boxReview = state.boxReview.filter((value) => value !== index);
      renderBoxArea();
    });
  });
}

function renderAssignArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "assign") {
    els.assignList.innerHTML = "";
    return;
  }

  els.assignList.innerHTML = state.currentCrisis.assignItems
    .map((item, index) => {
      const selected = state.assignSelections[index];
      return `
        <article class="assign-row ${state.assignReview.includes(index) ? "review-wrong" : ""}">
          <div class="assign-copy">
            <strong>${item.label}</strong>
            <p>${item.prompt}</p>
          </div>
          <div class="assign-choice-group">
            ${item.options
              .map((option) => {
                const isWrongPick =
                  state.assignReview.includes(index) && selected === option && option !== item.answer;
                const isCorrect =
                  state.assignReview.includes(index) && option === item.answer;
                return `
                  <button
                    class="assign-toggle ${selected === option ? "active" : ""} ${isWrongPick ? "wrong-pick" : ""} ${isCorrect ? "correct-answer" : ""}"
                    data-index="${index}"
                    data-value="${option}"
                  >
                    ${option}
                  </button>
                `;
              })
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".assign-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.assignSelections[index] = button.dataset.value;
      state.assignReview = state.assignReview.filter((value) => value !== index);
      renderAssignArea();
    });
  });
}

function renderMultiArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "multi") {
    els.multiList.innerHTML = "";
    return;
  }

  els.multiReadout.textContent = state.currentCrisis.multiPrompt;
  els.multiList.innerHTML = state.currentCrisis.multiItems
    .map(
      (item, index) => `
        <button class="action-card multi-card ${state.multiSelections[index] ? "selected" : ""}" data-index="${index}">
          <strong>Seçenek ${String.fromCharCode(65 + index)}</strong>
          ${item.text}
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".multi-card").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.multiSelections[index] = !state.multiSelections[index];
      renderMultiArea();
    });
  });
}

function renderCompareArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "compare") {
    els.compareList.innerHTML = "";
    return;
  }

  els.compareReadout.textContent = state.currentCrisis.comparePrompt;
  els.compareList.innerHTML = state.currentCrisis.compareItems
    .map(
      (item, index) => `
        <article class="compare-row">
          <div class="compare-copy">
            <strong>${item.label || `Satır ${index + 1}`}</strong>
            <p>${item.left} ? ${item.right}</p>
          </div>
          <div class="compare-choice-group">
            ${item.options
              .map(
                (option) => `
                  <button class="compare-toggle ${state.compareSelections[index] === option ? "active" : ""}" data-index="${index}" data-value="${option}">
                    ${option}
                  </button>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".compare-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      state.compareSelections[index] = button.dataset.value;
      renderCompareArea();
    });
  });
}

function renderStepperArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "stepper") {
    els.stepperList.innerHTML = "";
    return;
  }

  els.stepperReadout.textContent = state.currentCrisis.stepperPrompt;
  els.stepperList.innerHTML = state.currentCrisis.stepperItems
    .map(
      (item, index) => `
        <article class="stepper-row">
          <div class="stepper-copy">
            <strong>${item.label}</strong>
            <p>${item.formula || ""}</p>
          </div>
          <div class="stepper-controls">
            <button class="stepper-button" data-index="${index}" data-dir="-1">−</button>
            <span class="stepper-value">${state.stepperValues[index]}</span>
            <button class="stepper-button" data-index="${index}" data-dir="1">+</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".stepper-button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const dir = Number(button.dataset.dir);
      const item = state.currentCrisis.stepperItems[index];
      state.stepperValues[index] = Math.max(item.min, Math.min(item.max, state.stepperValues[index] + dir));
      renderStepperArea();
    });
  });
}

function renderTablePickArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "tablepick") {
    els.tablePickBoard.innerHTML = "";
    return;
  }

  els.tablePickReadout.textContent = state.currentCrisis.tablePickPrompt;
  els.tablePickBoard.innerHTML = `
    <table class="data-table table-pick-table">
      <thead>
        <tr>${state.currentCrisis.tablePickHeaders.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${state.currentCrisis.tablePickRows
          .map(
            (row, index) => `
              <tr class="table-pick-row ${state.tablePickSelection === index ? "selected" : ""}" data-index="${index}">
                ${row.map((cell) => `<td>${cell}</td>`).join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".table-pick-row").forEach((row) => {
    row.addEventListener("click", () => {
      state.tablePickSelection = Number(row.dataset.index);
      renderTablePickArea();
    });
  });
}

function renderMatrixArea() {
  if (!state.currentCrisis || state.currentCrisis.mode !== "matrix") {
    els.matrixBoard.innerHTML = "";
    return;
  }

  els.matrixReadout.textContent = state.currentCrisis.matrixPrompt;
  els.matrixBoard.innerHTML = `
    <table class="data-table matrix-table">
      <thead>
        <tr>
          <th>Satır</th>
          ${state.currentCrisis.matrixCols.map((column) => `<th>${column}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${state.currentCrisis.matrixRows
          .map(
            (row, rowIndex) => `
              <tr>
                <td>${row}</td>
                ${state.currentCrisis.matrixCols
                  .map(
                    (column) => `
                      <td class="matrix-cell">
                        <button class="matrix-toggle ${state.matrixSelections[rowIndex] === column ? "active" : ""}" data-row="${rowIndex}" data-value="${column}">●</button>
                      </td>
                    `
                  )
                  .join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".matrix-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const row = Number(button.dataset.row);
      state.matrixSelections[row] = button.dataset.value;
      renderMatrixArea();
    });
  });
}

function hasRequiredScan() {
  if (!state.currentCrisis || !state.currentCrisis.scanRequired) {
    return true;
  }
  const scanned = state.currentCrisis.scanned || [];
  if (state.currentCrisis.requireAllScans) {
    return state.currentCrisis.relatedSymbols.every((symbol) => scanned.includes(symbol));
  }
  return scanned.some((symbol) => state.currentCrisis.relatedSymbols.includes(symbol));
}

function ensureScanReady() {
  if (hasRequiredScan()) {
    syncTaskNotice();
    return true;
  }
  logLine("Bu paket kilitli. İlgili atomu taramadan karar veremezsin.", "alert");
  showTaskNotice("bad", "Tarama Gerekli", "Bu müdahale önce ham veri istiyor. Tarama panelini açabilir ya da terminalden tarama na gibi bir komut çalıştırabilirsin.");
  return false;
}

function isRejectCommand(command) {
  return command === "karti-reddet" || command === "karti reddet";
}

function isAcceptCommand(command) {
  return command === "karti-kabul-et" || command === "karti kabul et";
}

function applyPenalty(delta, isBad, options = {}) {
  let finalDelta = delta;
  if (isBad && state.utilities.shieldArmed) {
    finalDelta = 0;
    state.utilities.shieldArmed = false;
    logLine("Yedek sigorta darbeyi emdi. Ceza nötrlendi.", "good");
  }
  if (isBad && finalDelta < 0) {
    const severityMultiplier =
      state.currentCrisis?.severity === "kritik"
        ? 1.7
        : state.currentCrisis?.severity === "yüksek"
          ? 1.15
          : 1;
    finalDelta = Math.round(finalDelta * severityMultiplier);
  }
  state.stability = Math.max(0, Math.min(100, state.stability + finalDelta));
  if (isBad && finalDelta < 0 && !options.skipHeat) {
    const heatDelta =
      typeof options.heatDelta === "number"
        ? options.heatDelta
        : state.currentCrisis?.severity === "kritik"
          ? 8
          : state.currentCrisis?.severity === "yüksek"
            ? 6
            : 4;
    changeHeat(heatDelta, { quietVisual: true, skipHud: true });
  }
  if (isBad) {
    flashDamage();
  } else {
    flashGood();
  }
  updateHud();
  return finalDelta;
}

function adjustedCrisisDelta(success, delta) {
  if (!success || delta <= 0) {
    return delta;
  }
  return Math.max(4, Math.round(delta * SUCCESS_STABILITY_FACTOR));
}

function buildCorrectGuidance() {
  const crisis = state.currentCrisis;
  if (!crisis) {
    return [];
  }

  const details = [];
  let reason = crisis.correctWhy || crisis.deepIntel?.value || crisis.successText || "";

  if (crisis.mode === "choice") {
    const correctOption = crisis.options.find((entry) => entry.correct);
    if (correctOption) {
      details.push(`Doğru şık: ${correctOption.text}`);
      if (!crisis.correctWhy && !crisis.deepIntel) {
        reason = correctOption.teachWhy || correctOption.feedback || reason;
      }
    }
  }

  if (crisis.mode === "command") {
    if (crisis.expectedCommand) {
      details.push(`Doğru komut: ${crisis.expectedCommand}`);
    }
  }

  if (crisis.mode === "sequence") {
    details.push(`Doğru sıra: ${crisis.sequenceTarget.join(" > ")}`);
  }

  if (crisis.mode === "classify") {
    details.push(
      `Doğru işaretler: ${crisis.classifyTarget
        .map((value, index) => `${index + 1}. satır ${value}`)
        .join(" / ")}`
    );
  }

  if (crisis.mode === "box") {
    details.push(`Doğru yerleşim: ${makeBoxLine(crisis.boxTarget, crisis.boxLabels || [])}`);
  }

  if (crisis.mode === "assign") {
    details.push(
      `Doğru eşleşmeler: ${crisis.assignItems
        .map((item) => `${item.label} -> ${item.answer}`)
        .join(" / ")}`
    );
  }

  if (crisis.mode === "multi") {
    details.push(
      `Doğru seçimler: ${crisis.multiItems
        .filter((item) => item.correct)
        .map((item) => item.text)
        .join(" / ")}`
    );
  }

  if (crisis.mode === "compare") {
    details.push(
      `Doğru ilişkiler: ${crisis.compareItems
        .map((item) => `${item.left} ${item.answer} ${item.right}`)
        .join(" / ")}`
    );
  }

  if (crisis.mode === "stepper") {
    details.push(
      `Doğru değerler: ${crisis.stepperItems.map((item) => `${item.label}: ${item.answer}`).join(" / ")}`
    );
  }

  if (crisis.mode === "tablepick") {
    details.push(`Doğru satır: ${crisis.tablePickRows[crisis.tablePickAnswer][0]}`);
  }

  if (crisis.mode === "matrix") {
    details.push(
      `Doğru eşleşmeler: ${crisis.matrixRows
        .map((row, index) => `${row} -> ${crisis.matrixAnswers[index]}`)
        .join(" / ")}`
    );
  }

  if (crisis.mode === "threat") {
    const labelMap = {
      stabil: "Stabil",
      izle: "İzle",
      mudahale: "Müdahale Et",
      kritik: "Kritik",
    };
    details.push(`Doğru seviye: ${labelMap[crisis.threatTarget]}`);
  }

  if (reason) {
    details.push(`Neden: ${reason}`);
  }

  return details;
}

function expireTimedCrisis() {
  const timed = currentTimedChallenge();
  if (!state.active || !state.currentCrisis || !timed || timed.resolved || timed.expired) {
    return;
  }

  timed.remaining = 0;
  timed.resolved = true;
  timed.expired = true;
  state.crisisResolved = true;
  state.timedCueSecond = null;

  const applied = applyPenalty(timed.penalty, true, { heatDelta: 7 });
  const payload = {
    reason: "Süreli paket zamanında çözülemedi; müdahale penceresi kapandı.",
    details: buildCorrectGuidance(),
  };
  addMistake(`${state.currentCrisis.title} // Süreli Paket`, payload.reason, payload.details);
  showVerdict(
    "bad",
    "Süre Penceresi Kaçtı",
    `Bu kriz ayrılan sürede çözülemedi. Stabilite: ${applied}. ${payload.details.slice(0, 2).join(" // ")}`
  );
  scrollToCrisisFocus();
  logLine("Süreli paket kapandı. Müdahale geciktiği için dosya kaçtı.", "alert");
  syncTaskNotice();
  updateInteractionType();

  if (state.mistakes.length >= mistakeLimit()) {
    queueEndGame(false, "Çok fazla kritik yanlış yapıldı. Operatör yetkisi devreden çıkarıldı.");
    return;
  }

  if (state.stability <= 0) {
    queueEndGame(false, "Stabilite tükendi. Reaktör gövdesi zincirleme kararsızlığa girdi.");
    return;
  }

  window.setTimeout(nextCrisis, 1850);
}

function normalizeMistakePayload(whyWrong) {
  if (!whyWrong) {
    return null;
  }

  const guidance = buildCorrectGuidance();
  const payload =
    typeof whyWrong === "string"
      ? { reason: whyWrong, details: [] }
      : { reason: whyWrong.reason, details: [...(whyWrong.details || [])] };

  payload.details = [
    ...guidance,
    ...payload.details.filter((detail) => !guidance.includes(detail)),
  ];

  return payload;
}

function resolveCurrent(success, feedback, delta, whyWrong = "") {
  const resolvedMode = state.currentCrisis?.mode;
  state.crisisResolved = true;
  if (state.currentCrisis?.timedChallenge) {
    state.currentCrisis.timedChallenge.resolved = true;
  }
  state.timedCueSecond = null;
  if (success) {
    state.stats.successCount += 1;
  }
  const applied = applyPenalty(adjustedCrisisDelta(success, delta), !success);
  const payload = !success ? normalizeMistakePayload(whyWrong) : null;
  const verdictExtras =
    !success && payload?.details?.length
      ? ` ${payload.details.slice(0, 2).join(" // ")}`
      : "";
  showVerdict(
    success ? "good" : "bad",
    success ? "Doğru Müdahale" : "Yanlış Müdahale",
    `${feedback} Stabilite: ${applied > 0 ? "+" : ""}${applied}.${verdictExtras}`
  );
  scrollToCrisisFocus();
  logLine(feedback, success ? "good" : "alert");
  syncTaskNotice();
  updateInteractionType();
  if (state.tutorialMode) {
    if (resolvedMode === "choice") {
      notifyTutorialTrigger("choiceResolved");
    } else if (resolvedMode === "command") {
      notifyTutorialTrigger("commandResolved");
    } else if (resolvedMode === "box") {
      notifyTutorialTrigger("boxResolved");
    }
  }

  if (!success) {
    if (payload) {
      addMistake(state.currentCrisis.title, payload.reason, payload.details || []);
    }
    if (state.mistakes.length >= mistakeLimit()) {
      queueEndGame(false, "Çok fazla kritik yanlış yapıldı. Operatör yetkisi devreden çıkarıldı.");
      return;
    }
  }

  if (state.stability <= 0) {
    queueEndGame(false, "Stabilite tükendi. Reaktör gövdesi zincirleme kararsızlığa girdi.");
    return;
  }

  window.setTimeout(nextCrisis, success ? 1700 : 2200);
}

function resolveChoice(index) {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "choice") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  const option = state.currentCrisis.options[index];
  const correctOption = state.currentCrisis.options.find((entry) => entry.correct);
  const correctIndex = state.currentCrisis.options.findIndex((entry) => entry.correct);
  document.querySelectorAll(".action-card").forEach((card, cardIndex) => {
    card.disabled = true;
    if (cardIndex === index) {
      card.classList.add(option.correct ? "correct" : "wrong");
    }
    if (!option.correct && cardIndex === correctIndex) {
      card.classList.add("revealed-correct");
    }
  });
  resolveCurrent(
    option.correct,
    option.feedback,
    option.delta,
    option.correct
      ? ""
      : {
          reason: option.whyWrong,
          details: [
            `Seçtiğin müdahale: ${option.text}`,
          ],
        }
  );
}

function submitSequence() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "sequence") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  if (state.sequence.selected.length !== state.currentCrisis.sequenceTarget.length) {
    showTaskNotice("bad", "Dizi Eksik", "Önce gereken sayıda parçayı sıraya yerleştir.");
    return;
  }
  const answer = state.sequence.selected.join(">");
  const target = state.currentCrisis.sequenceTarget.join(">");
  if (answer === target) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
  } else {
    const wrongPayload = {
      reason: state.currentCrisis.failureWhy,
      details: [
        `Senin sıran: ${state.sequence.selected.join(" > ")}`,
        `Doğru sıra: ${state.currentCrisis.sequenceTarget.join(" > ")}`,
      ],
    };

    if (state.currentCrisis.id === "core-sync-final") {
      const payload = normalizeMistakePayload(wrongPayload);
      const finalPenalty = Math.min(-18, Math.round(state.currentCrisis.failureDelta * 1.45));
      const applied = applyPenalty(finalPenalty, true, { heatDelta: 8 });

      if (payload) {
        addMistake(state.currentCrisis.title, payload.reason, payload.details || []);
      }

      showVerdict(
        "bad",
        "Kapanış Zinciri Açık",
        `${state.currentCrisis.failureText} Stabilite: ${applied}. ${payload?.details?.slice(0, 2).join(" // ") || ""}`
      );
      showTaskNotice(
        "bad",
        "Kapanış Sırası Yanlış",
        "Bu panel doğru konu zinciri kurulana kadar kapanmaz. Sırayı düzeltip yeniden onayla."
      );
      scrollToCrisisFocus();
      logLine(state.currentCrisis.failureText, "alert");

      if (state.mistakes.length >= mistakeLimit()) {
        queueEndGame(false, "Çok fazla kritik yanlış yapıldı. Operatör yetkisi devreden çıkarıldı.");
        return;
      }

      if (state.stability <= 0) {
        queueEndGame(false, "Stabilite tükendi. Reaktör gövdesi zincirleme kararsızlığa girdi.");
      }
      return;
    }

    resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, wrongPayload);
  }
}

function submitClassify() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "classify") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  if (state.classify.includes("?")) {
    showTaskNotice("bad", "İşaretler Eksik", "Önce tüm satırları işaretle.");
    return;
  }
  const answer = state.classify.join("|");
  const target = state.currentCrisis.classifyTarget.join("|");
  if (answer === target) {
    state.classifyReview = [];
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
  } else {
    const mismatches = state.currentCrisis.classifyItems
      .map((item, index) => ({
        item,
        index,
        mine: state.classify[index],
        truth: state.currentCrisis.classifyTarget[index],
      }))
      .filter((entry) => entry.mine !== entry.truth);
    state.classifyReview = mismatches.map((entry) => entry.index);
    renderClassifyArea();
    const details = mismatches.map(
        (entry) =>
          `Satır ${entry.index + 1}: "${entry.item.text}" // sen: ${entry.mine}, doğrusu: ${entry.truth}`
      );
    resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
      reason: state.currentCrisis.failureWhy,
      details,
    });
  }
}

function submitThreat() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "threat") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  if (!state.threatLevel) {
    showTaskNotice("bad", "Seviye Eksik", "Önce bir tehdit seviyesi seç.");
    return;
  }
  if (state.threatLevel === state.currentCrisis.threatTarget) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
  } else {
    const labelMap = {
      stabil: "Stabil",
      izle: "İzle",
      mudahale: "Müdahale Et",
      kritik: "Kritik",
    };
    resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
      reason: state.currentCrisis.failureWhy,
      details: [
        `Seçtiğin seviye: ${labelMap[state.threatLevel]}`,
        `Daha uygun seviye: ${labelMap[state.currentCrisis.threatTarget]}`,
      ],
    });
  }
}

function submitBox() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "box") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  if (state.boxState.includes(-1)) {
    showTaskNotice("bad", "Seçimler Eksik", "Önce her kutu için ∅, ↑ ya da ↑↓ seç.");
    return;
  }
  const answer = state.boxState.join("|");
  const target = state.currentCrisis.boxTarget.join("|");
  if (answer === target) {
    state.boxReview = [];
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
  } else {
    const mismatches = state.currentCrisis.boxTarget
      .map((truth, index) => ({
        index,
        truth,
        mine: state.boxState[index],
      }))
      .filter((entry) => entry.mine !== entry.truth);
    state.boxReview = mismatches.map((entry) => entry.index);
    renderBoxArea();
    resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
      reason: state.currentCrisis.failureWhy,
      details: mismatches.map((entry) => {
        const label = state.currentCrisis.boxLabels?.[entry.index] || `Kutu ${entry.index + 1}`;
        return `${label} // sen: ${boxStateGlyph(entry.mine)} (${boxStateName(entry.mine)}), doğrusu: ${boxStateGlyph(entry.truth)} (${boxStateName(entry.truth)})`;
      }),
    });
  }
}

function submitAssign() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "assign") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }
  if (!ensureScanReady()) {
    return;
  }
  if (state.assignSelections.includes("")) {
    showTaskNotice("bad", "Eşleştirme Eksik", "Önce tüm satırlara bir seçim ver.");
    return;
  }

  const mismatches = state.currentCrisis.assignItems
    .map((item, index) => ({
      index,
      item,
      mine: state.assignSelections[index],
      truth: item.answer,
    }))
    .filter((entry) => entry.mine !== entry.truth);

  if (mismatches.length === 0) {
    state.assignReview = [];
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  state.assignReview = mismatches.map((entry) => entry.index);
  renderAssignArea();
  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details: mismatches.map(
      (entry) => `${entry.item.label} // sen: ${entry.mine}, doğrusu: ${entry.truth}`
    ),
  });
}

function submitMulti() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "multi") {
    return;
  }
  if (!ensureUnlocked() || !ensureScanReady()) {
    return;
  }

  const target = state.currentCrisis.multiItems.map((item) => Boolean(item.correct));
  const answer = state.multiSelections.map((item) => Boolean(item));
  if (answer.every((value, index) => value === target[index])) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  const details = state.currentCrisis.multiItems
    .map((item, index) => ({
      item,
      index,
      mine: answer[index],
      truth: target[index],
    }))
    .filter((entry) => entry.mine !== entry.truth)
    .map(
      (entry) =>
        `Seçenek ${String.fromCharCode(65 + entry.index)} // sen: ${entry.mine ? "seçildi" : "seçilmedi"}, doğrusu: ${entry.truth ? "seçilmeli" : "seçilmemeli"}`
    );

  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details,
  });
}

function submitCompare() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "compare") {
    return;
  }
  if (!ensureUnlocked() || !ensureScanReady()) {
    return;
  }
  if (state.compareSelections.includes("")) {
    showTaskNotice("bad", "Karşılaştırma Eksik", "Önce her satır için bir ilişki seç.");
    return;
  }

  const mismatches = state.currentCrisis.compareItems
    .map((item, index) => ({ item, index, mine: state.compareSelections[index], truth: item.answer }))
    .filter((entry) => entry.mine !== entry.truth);

  if (mismatches.length === 0) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details: mismatches.map(
      (entry) => `${entry.item.left} ? ${entry.item.right} // sen: ${entry.mine}, doğrusu: ${entry.truth}`
    ),
  });
}

function submitStepper() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "stepper") {
    return;
  }
  if (!ensureUnlocked() || !ensureScanReady()) {
    return;
  }

  const mismatches = state.currentCrisis.stepperItems
    .map((item, index) => ({ item, index, mine: state.stepperValues[index], truth: item.answer }))
    .filter((entry) => entry.mine !== entry.truth);

  if (mismatches.length === 0) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details: mismatches.map(
      (entry) => `${entry.item.label} // sen: ${entry.mine}, doğrusu: ${entry.truth}`
    ),
  });
}

function submitTablePick() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "tablepick") {
    return;
  }
  if (!ensureUnlocked() || !ensureScanReady()) {
    return;
  }
  if (state.tablePickSelection < 0) {
    showTaskNotice("bad", "Satır Seçilmedi", "Önce tablodan bir satır seç.");
    return;
  }
  if (state.tablePickSelection === state.currentCrisis.tablePickAnswer) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }
  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details: [
      `Seçtiğin satır: ${state.currentCrisis.tablePickRows[state.tablePickSelection][0]}`,
      `Doğru satır: ${state.currentCrisis.tablePickRows[state.currentCrisis.tablePickAnswer][0]}`,
    ],
  });
}

function submitMatrix() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "matrix") {
    return;
  }
  if (!ensureUnlocked() || !ensureScanReady()) {
    return;
  }
  if (state.matrixSelections.includes("")) {
    showTaskNotice("bad", "Matris Eksik", "Önce her satırı bir sütunla işaretle.");
    return;
  }

  const mismatches = state.currentCrisis.matrixRows
    .map((row, index) => ({ row, index, mine: state.matrixSelections[index], truth: state.currentCrisis.matrixAnswers[index] }))
    .filter((entry) => entry.mine !== entry.truth);

  if (mismatches.length === 0) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, {
    reason: state.currentCrisis.failureWhy,
    details: mismatches.map((entry) => `${entry.row} // sen: ${entry.mine}, doğrusu: ${entry.truth}`),
  });
}

function normalizeCommand(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, " ");
}

function handleCommand() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.mode !== "command") {
    return;
  }
  if (!ensureUnlocked()) {
    return;
  }

  const command = normalizeCommand(els.commandInput.value);
  if (!command) {
    return;
  }
  els.commandInput.value = "";
  logLine(`> ${command}`, "dim");
  playSfx("terminal-send");

  if (command === "yardim") {
    logLine("Komutlar: yardım, notlar, tarama, durum, yönlendir [hedef], etiketle [hedef], kartı-reddet, kartı-kabul-et", "good");
    logLine("Hedef örnekleri: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p", "dim");
    logLine("Etiket örnekleri: etiketle 2s / etiketle 3p", "dim");
    logLine("Tarama örnekleri: tarama na / tarama kok oh / tarama cl -1", "dim");
    if (state.currentCrisis?.mode === "command" && state.currentCrisis.validate(command)) {
      resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    }
    return;
  }

  if (command === "notlar") {
    setOverlay(els.notesOverlay, true);
    return;
  }

  if (command === "tarama" || command.startsWith("tarama ")) {
    startTerminalScan(command);
    return;
  }

  if (command === "durum") {
    logLine(`Süre ${state.timeLeft} sn, stabilite ${state.stability}%, kriz ${state.currentIndex + 1}/${state.crises.length}.`, "good");
    return;
  }

  if (!ensureScanReady()) {
    return;
  }

  if (state.currentCrisis.validate(command)) {
    resolveCurrent(true, state.currentCrisis.successText, state.currentCrisis.successDelta);
    return;
  }

  if (state.attempts === 0) {
    state.attempts += 1;
    logLine("Komut doğrulanmadı. Genel terminal fiillerini görmek için YARDIM yazabilirsin.", "alert");
    showTaskNotice("bad", "Komut Belirsiz", "Bu komut sistemde tanınmadı. Önce fiil kataloğuna bakmak daha güvenli olabilir.");
    return;
  }

  state.attempts += 1;
  applyPenalty(-3, true);
  if (state.attempts >= 2) {
    resolveCurrent(false, state.currentCrisis.failureText, state.currentCrisis.failureDelta, state.currentCrisis.failureWhy);
    return;
  }
  logLine("Komut reddedildi. Bir deneme daha kaldı.", "alert");
}

function useCoolant() {
  if (!state.active || state.utilities.coolant <= 0) {
    return;
  }
  state.utilities.coolant -= 1;
  state.stats.utilityCount += 1;
  playSfx("utility-coolant");
  state.timeLeft = Math.max(0, state.timeLeft - 12);
  state.stability = Math.min(100, state.stability + 8);
  changeHeat(-14, { fromCooling: true, quietVisual: true, skipHud: true });
  logLine("Acil soğutma açıldı. Stabilite yükseldi, süre harcandı.", "good");
  updateHud();
}

function useIntel() {
  if (!state.active || state.utilities.intel <= 0 || !state.currentCrisis) {
    return;
  }
  if (state.currentCrisis.deepIntelUsed || !state.currentCrisis.deepIntel) {
    logLine("Bu paket için ek tanı verecek yeni veri kalmadı.", "dim");
    return;
  }
  state.utilities.intel -= 1;
  state.stats.utilityCount += 1;
  playSfx("utility-intel");
  state.timeLeft = Math.max(0, state.timeLeft - 8);
  state.currentCrisis.deepIntelUsed = true;
  state.currentCrisis.extraEvidence = state.currentCrisis.extraEvidence || [];
  state.currentCrisis.extraEvidence.push(state.currentCrisis.deepIntel);
  renderEvidence(currentEvidence());
  logLine("Derin tanı modülü ek veri çıkardı.", "good");
  updateHud();
}

function useShield() {
  if (!state.active || state.utilities.shield <= 0) {
    return;
  }
  state.utilities.shield -= 1;
  state.stats.utilityCount += 1;
  playSfx("utility-shield");
  state.utilities.shieldArmed = true;
  logLine("Yedek sigorta kuruldu. Sıradaki ciddi darbe emilecek.", "good");
  updateHud();
}

function useStasis() {
  if (!state.active || state.utilities.stasis <= 0) {
    return;
  }
  state.utilities.stasis -= 1;
  state.stats.utilityCount += 1;
  playSfx("utility-stasis");
  state.freezeTicks = Math.max(state.freezeTicks, 10);
  logLine("Alan sabitleme açıldı. Zaman akışı 10 sn boyunca yavaşlatıldı.", "good");
  updateHud();
}

function armLockEvent(crisis) {
  if (!crisis.lockEvent) {
    state.lockEvent = null;
    setOverlay(els.lockOverlay, false);
    return;
  }

  state.lockEvent = { ...crisis.lockEvent, resolved: false, failures: 0 };
  state.stats.lockCount += 1;
  els.lockTitle.textContent = state.lockEvent.title;
  els.lockText.textContent = state.lockEvent.text;
  els.lockHint.textContent = state.lockEvent.hint;
  els.lockInput.value = "";
  setOverlay(els.lockOverlay, true);
  playSfx("warning");
  changeHeat(4, { quietVisual: true, skipHud: true });
  pulseGlitch();
  logLine("Canlı olay: panel kilidi devreye girdi.", "alert");
}

function submitLockEvent() {
  if (!state.active || !state.lockEvent || state.lockEvent.resolved) {
    return;
  }

  const entered = normalizeCommand(els.lockInput.value).replace(/\s+/g, "");
  const expected = normalizeCommand(state.lockEvent.answer).replace(/\s+/g, "");
  if (!entered) {
    return;
  }

  if (entered === expected) {
    state.lockEvent.resolved = true;
    playSfx("lock-open");
    setOverlay(els.lockOverlay, false);
    flashGood();
    syncTaskNotice();
    logLine("Panel kilidi açıldı. Ana ekran geri geldi.", "good");
    showVerdict("good", "Kilit Açıldı", "Canlı olay çözüldü. Asıl kriz akışı devam ediyor.");
    return;
  }

  state.lockEvent.failures += 1;
  playSfx("lock-deny");
  state.timeLeft = Math.max(0, state.timeLeft - 4);
  applyPenalty(-4, true);
  pulseGlitch();
  els.lockInput.value = "";
  logLine("Kilit kodu reddedildi. Glitch katmanı sürüyor.", "alert");
  if (state.lockEvent.failures >= 2) {
    els.lockHint.textContent = `${state.lockEvent.hint} Kod, Türkçe karakter gerektirmez.`;
  }
  if (state.lockEvent.failures >= 3) {
    addMistake(`${state.currentCrisis.title} // Canlı Kilit`, "Canlı olay kodu çözülemedi; erişim katmanı kapalı kaldı.", [
      `Doğru kod: ${state.lockEvent.answer}`,
      `İpucu: ${state.lockEvent.hint}`,
      "Kilit çözülmeden ana panele geri dönülemedi.",
    ]);
    endGame(false, "Canlı olay kilidi üç denemede açılamadı. Kontrol penceresi kapandı.");
    return;
  }
  if (state.timeLeft <= 0 || state.stability <= 0) {
    addMistake(`${state.currentCrisis.title} // Canlı Kilit`, "Canlı olay sırasında kaynak tükendi.", [
      `Doğru kod: ${state.lockEvent.answer}`,
      `İpucu: ${state.lockEvent.hint}`,
      "Kilit çözümü geciktiği için panel kapanışı yaşandı.",
    ]);
    endGame(false, "Canlı olay kilidi kontrol penceresini kapattı.");
  }
}

function ignoreCurrentCrisis() {
  if (!state.active || state.crisisResolved || !state.currentCrisis || state.currentCrisis.id === "core-sync-final") {
    return;
  }
  if (state.currentCrisis.severity === "kritik") {
    return;
  }
  const applied = applyPenalty(currentDifficulty().ignorePenalty, true);
  const guidance = buildCorrectGuidance();
  addMistake(state.currentCrisis.title, "Kriz operatör tarafından bilerek atlandı.", [
    ...guidance,
    "Bu kayıt görmezden gelindi.",
    "Doğrudan çözüm denenmediği için sistem ağır stabilite kaybetti.",
  ]);
  guidance.forEach((line) => logLine(`[çözüm] ${line}`, line.startsWith("Neden:") ? "system" : "good"));
  showVerdict(
    "bad",
    "Kriz Atlandı",
    `Krize müdahale edilmedi. Stabilite: ${applied}. ${guidance.slice(0, 3).join(" // ")}`
  );
  scrollToCrisisFocus();
  logLine(`${state.currentCrisis.title} operatör tarafından görmezden gelindi.`, "alert");
  if (state.mistakes.length >= mistakeLimit()) {
    queueEndGame(false, "Çok fazla kritik yanlış yapıldı. Operatör yetkisi devreden çıkarıldı.");
    return;
  }
  if (state.stability <= 0) {
    queueEndGame(false, "Stabilite tükendi. Reaktör gövdesi zincirleme kararsızlığa girdi.");
    return;
  }
  window.setTimeout(nextCrisis, 1100);
}

function buildChoiceCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "choice",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    correctWhy: config.correctWhy,
    options: shuffle(config.options),
  };
}

function buildCommandCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "command",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    validate: config.validate,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    expectedCommand: config.expectedCommand,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildSequenceCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "sequence",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    sequenceBank: config.sequenceBank,
    sequenceTarget: config.sequenceTarget,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildClassifyCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "classify",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    classifyItems: config.classifyItems,
    classifyTarget: config.classifyTarget,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildThreatCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "threat",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    threatTarget: config.threatTarget,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildBoxCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "box",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    boxTarget: config.boxTarget,
    boxLabels: config.boxLabels || config.boxTarget.map((_, index) => `Kutu ${index + 1}`),
    boxPrompt: config.boxPrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildAssignCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "assign",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    assignItems: config.assignItems,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildMultiCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "multi",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    multiItems: shuffle(config.multiItems),
    multiPrompt: config.multiPrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildCompareCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "compare",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    compareItems: config.compareItems.map((item) => ({ ...item, options: item.options || ["<", ">", "="] })),
    comparePrompt: config.comparePrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildStepperCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "stepper",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    stepperItems: config.stepperItems,
    stepperPrompt: config.stepperPrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildTablePickCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "tablepick",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    tablePickHeaders: config.tablePickHeaders,
    tablePickRows: config.tablePickRows,
    tablePickAnswer: config.tablePickAnswer,
    tablePickPrompt: config.tablePickPrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function buildMatrixCrisis(config) {
  return {
    category: config.category,
    id: config.id,
    mode: "matrix",
    title: config.title,
    text: config.text,
    evidence: config.evidence,
    relatedSymbols: config.relatedSymbols || [],
    deepIntel: config.deepIntel,
    scanRequired: config.scanRequired || false,
    requireAllScans: config.requireAllScans || false,
    matrixRows: config.matrixRows,
    matrixCols: config.matrixCols,
    matrixAnswers: config.matrixAnswers,
    matrixPrompt: config.matrixPrompt,
    successText: config.successText,
    successDelta: config.successDelta,
    failureText: config.failureText,
    failureDelta: config.failureDelta,
    failureWhy: config.failureWhy,
    correctWhy: config.correctWhy,
    bootLog: config.bootLog,
  };
}

function ionizationTableMarkup(values) {
  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>İE₁</th>
          <th>İE₂</th>
          <th>İE₃</th>
          <th>İE₄</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          ${values.map((value) => `<td>${value}</td>`).join("")}
        </tr>
      </tbody>
    </table>
  `;
}

function genericTableMarkup(headers, rows) {
  return `
    <table class="data-table">
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function trendGraphMarkup(labels, values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const plotLeft = 30;
  const plotRight = 188;
  const plotTop = 22;
  const plotBottom = 90;
  const labelY = 114;
  const points = values
    .map((value, index) => {
      const x = 34 + index * ((plotRight - 34) / Math.max(labels.length - 1, 1));
      const y = plotBottom - ((value - min) / range) * (plotBottom - plotTop);
      return `${x},${y}`;
    })
    .join(" ");

  return `
    <svg class="orbital-svg" viewBox="0 0 220 136" role="img" aria-label="trend grafiği">
      <rect x="10" y="10" width="200" height="116" rx="18" fill="rgba(7, 13, 20, 0.92)" stroke="rgba(145, 200, 231, 0.14)" />
      <line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" stroke="rgba(145, 200, 231, 0.24)" />
      <line x1="${plotLeft}" y1="${plotTop}" x2="${plotLeft}" y2="${plotBottom}" stroke="rgba(145, 200, 231, 0.24)" />
      <polyline fill="none" stroke="rgba(62, 247, 207, 0.94)" stroke-width="3" points="${points}" />
      ${values
        .map((value, index) => {
          const x = 34 + index * ((plotRight - 34) / Math.max(labels.length - 1, 1));
          const y = plotBottom - ((value - min) / range) * (plotBottom - plotTop);
          return `
            <circle cx="${x}" cy="${y}" r="4" fill="rgba(152, 231, 255, 0.98)" />
            <text x="${x}" y="${labelY}" text-anchor="middle" fill="rgba(211, 229, 239, 0.88)" font-size="10">${labels[index]}</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function orbitalVisualMarkup(type) {
  const svgMap = {
    "1s": `
      <svg class="orbital-svg" viewBox="0 0 220 128" role="img" aria-label="orbital yüzeyi">
        <rect x="10" y="10" width="200" height="108" rx="18" fill="rgba(7, 13, 20, 0.92)" stroke="rgba(145, 200, 231, 0.14)" />
        <circle cx="110" cy="64" r="30" fill="rgba(62, 247, 207, 0.62)" stroke="rgba(62, 247, 207, 0.96)" stroke-width="2" />
        <circle cx="110" cy="64" r="4" fill="rgba(255,255,255,0.94)" />
      </svg>
    `,
    "2px": `
      <svg class="orbital-svg" viewBox="0 0 220 128" role="img" aria-label="orbital yüzeyi">
        <rect x="10" y="10" width="200" height="108" rx="18" fill="rgba(7, 13, 20, 0.92)" stroke="rgba(145, 200, 231, 0.14)" />
        <line x1="26" y1="64" x2="194" y2="64" stroke="rgba(145, 200, 231, 0.22)" />
        <ellipse cx="68" cy="64" rx="34" ry="20" fill="rgba(152, 231, 255, 0.58)" stroke="rgba(152, 231, 255, 0.92)" stroke-width="2" />
        <ellipse cx="152" cy="64" rx="34" ry="20" fill="rgba(152, 231, 255, 0.58)" stroke="rgba(152, 231, 255, 0.92)" stroke-width="2" />
        <circle cx="110" cy="64" r="4" fill="rgba(255,255,255,0.94)" />
      </svg>
    `,
    "2py": `
      <svg class="orbital-svg" viewBox="0 0 220 128" role="img" aria-label="orbital yüzeyi">
        <rect x="10" y="10" width="200" height="108" rx="18" fill="rgba(7, 13, 20, 0.92)" stroke="rgba(145, 200, 231, 0.14)" />
        <line x1="110" y1="22" x2="110" y2="106" stroke="rgba(145, 200, 231, 0.22)" />
        <ellipse cx="110" cy="38" rx="22" ry="30" fill="rgba(152, 231, 255, 0.58)" stroke="rgba(152, 231, 255, 0.92)" stroke-width="2" />
        <ellipse cx="110" cy="90" rx="22" ry="30" fill="rgba(152, 231, 255, 0.58)" stroke="rgba(152, 231, 255, 0.92)" stroke-width="2" />
        <circle cx="110" cy="64" r="4" fill="rgba(255,255,255,0.94)" />
      </svg>
    `,
    "2pz": `
      <svg class="orbital-svg" viewBox="0 0 220 128" role="img" aria-label="orbital yüzeyi">
        <rect x="10" y="10" width="200" height="108" rx="18" fill="rgba(7, 13, 20, 0.92)" stroke="rgba(145, 200, 231, 0.14)" />
        <line x1="72" y1="98" x2="148" y2="30" stroke="rgba(145, 200, 231, 0.22)" />
        <g transform="rotate(-32 110 64)">
          <ellipse cx="92" cy="42" rx="20" ry="30" fill="rgba(152, 231, 255, 0.3)" stroke="rgba(152, 231, 255, 0.56)" stroke-width="2" stroke-dasharray="5 4" />
          <ellipse cx="128" cy="86" rx="20" ry="30" fill="rgba(152, 231, 255, 0.68)" stroke="rgba(152, 231, 255, 0.98)" stroke-width="2" />
        </g>
        <circle cx="110" cy="64" r="4" fill="rgba(255,255,255,0.94)" />
      </svg>
    `,
  };

  return `<div class="orbital-visual">${svgMap[type] || svgMap["1s"]}</div>`;
}

function finalProtocolCrisis() {
  const sequenceTarget = [
    "Kuantum Modeli",
    "Orbital ve Kuantum Sayıları",
    "Elektron Dizilimi",
    "Periyodik Yer ve Özellik",
    "Yükseltgenme Basamağı",
  ];
  const distractors = ["Bohr Çizgisi", "Elektron İlgisi", "Çizgi Spektrumu"];
  let sequenceBank = shuffle([...sequenceTarget, ...distractors]);

  while (arraysEqual(sequenceBank.slice(0, sequenceTarget.length), sequenceTarget)) {
    sequenceBank = shuffle([...sequenceTarget, ...distractors]);
  }

  return buildSequenceCrisis({
    category: "core-sync-final",
    id: "core-sync-final",
    title: "Kapanış Sırası",
    text: "Tur bitti. Çekirdeği güvenli kapatmak için konu modüllerini öğrendiğin sırayla diz.",
    evidence: [
      { label: "Durum", value: "son kilit açıldı" },
      { label: "İstek", value: "konu zincirini doğru sıraya diz" },
      { label: "Not", value: "bu adım bitmeden tur tamamlanmış sayılmaz" },
    ],
    sequenceBank,
    sequenceTarget,
    successText: "Kapanış zinciri doğru kuruldu. Reaktör güvenli çıkış onayı verdi.",
    successDelta: 16,
    failureText: "Kapanış zinciri yanlış kuruldu. Güvenli çıkış onayı gelmedi.",
    failureDelta: -14,
    failureWhy: "Modern atom teorisinin konu sırası karıştı; güvenli kapanış zinciri tamamlanamadı.",
    bootLog: "Kapanış sırası paneli açıldı.",
  });
}

function protocolTextFor(crisis) {
  const protocols = [];

  if (crisis.scanRequired) {
    protocols.push(
      crisis.requireAllScans
        ? "önce ilgili türlerin tümünü tara"
        : "önce ilgili türü tara"
    );
  }

  if (crisis.category === "jump-table") {
    protocols.push("önce tablodaki büyük enerji sıçramasını bul");
  }

  return protocols.length ? pick(protocols) : "";
}

function lockTemplateFor(crisis) {
  const map = {
    "model-shift": [
      {
        title: "Kuantum Kilidi",
        text: "Hesap katmanı ekranı titretmeye başladı. Paneli geri almak için doğru bilim insanı kodu gerekir.",
        hint: "Kesin konum ve kesin hızın aynı anda belirlenemeyeceğini vurgulayan bilim insanını hatırla.",
        answer: "heisenberg",
      },
      {
        title: "Spektrum Kilidi",
        text: "Çizgi verisi eski çözümleyiciyi kilitledi. Giriş kodu bir model adının sahibini istiyor.",
        hint: "Tek elektronlu türlerin çizgi spektrumunu açıklamada öne çıkan bilim insanını hatırla.",
        answer: "bohr",
      },
    ],
    pauli: [
      {
        title: "Spin Kilidi",
        text: "Kayıt imzaları üst üste binince erişim katmanı kapandı. Sistem bir ilke adı bekliyor.",
        hint: "Aynı orbitalde en fazla iki elektron ve zıt spin sınırını anımsa.",
        answer: "pauli",
      },
    ],
    hund: [
      {
        title: "Dağılım Kilidi",
        text: "Eş enerjili kutular senkron dışına çıktı. Sistem kural adını doğrulamadan açılmayacak.",
        hint: "Eş enerjili orbitaller önce tek tek dolar.",
        answer: "hund",
      },
    ],
    aufbau: [
      {
        title: "Enerji Sırası Kilidi",
        text: "Dolum sırası paneli kapattı. Çekirdek, yerleşim ilkesinin adını istiyor.",
        hint: "Düşük enerjiden yüksek enerjiye dolum mantığı.",
        answer: "aufbau",
      },
    ],
    "quantum-card": [
      {
        title: "Kart Kilidi",
        text: "Kuantum kimlik katmanı alt düzey bilgisini okuyamadı. Erişim için doğru değişken etiketi isteniyor.",
        hint: "Cevap tek harften oluşur. s, p, d, f ayrımını veren kuantum etiketini düşün; enerji basamağını ya da spin yönünü değil.",
        answer: "l",
      },
    ],
    "orbital-label": [
      {
        title: "Etiket Kilidi",
        text: "Etiket arşivi paneli kapattı. Doğru anahtar kavram girilmeden yazım düzeltmesi açılmayacak.",
        hint: "Elektronun bulunma olasılığının yüksek olduğu bölgenin adı.",
        answer: "orbital",
      },
      {
        title: "Yönelim Kilidi",
        text: "Yönelim tablosu erişimi kapattı. Kilit, alt düzey içindeki yön ayrımını veren kuantum etiketini istiyor.",
        hint: "n, l, mₗ, mₛ içinden yönelimi gösteren sembolü düşün.",
        answer: "ml",
      },
    ],
    "manual-route": [
      {
        title: "Rota Kilidi",
        text: "Manuel yönlendirme paneli önce enerji sırası doğrulaması istiyor.",
        hint: "Düşük enerjiden yüksek enerjiye yerleşim ilkesinin adı.",
        answer: "aufbau",
      },
    ],
  };

  return map[crisis.category] ? { ...pick(map[crisis.category]), resolved: false } : null;
}

function decorateLockEvents(crises) {
  const eligible = crises.filter((crisis) => lockTemplateFor(crisis) && !crisis.timedChallenge);
  const preset = currentDifficulty();
  const desired =
    preset.lockMin + Math.floor(Math.random() * (preset.lockMax - preset.lockMin + 1));
  const lockCount = Math.min(desired, eligible.length);

  sample(eligible, lockCount).forEach((crisis) => {
    crisis.lockEvent = lockTemplateFor(crisis);
  });
}

function applySeverityToCrisis(crisis, severity) {
  const modifier = {
    düşük: { good: 0, bad: 0 },
    orta: { good: 0, bad: 0 },
    yüksek: { good: 1, bad: -2 },
    kritik: { good: 2, bad: -6 },
  }[severity];

  crisis.severity = severity;

  if (crisis.mode === "choice") {
    if (!crisis.baseOptions) {
      crisis.baseOptions = crisis.options.map((option) => ({ ...option }));
    }
    crisis.options = crisis.options.map((option) => ({
      ...(crisis.baseOptions.find((entry) => entry.text === option.text) || option),
      delta:
        (crisis.baseOptions.find((entry) => entry.text === option.text)?.delta ?? option.delta) +
        (option.correct ? modifier.good : modifier.bad),
    }));
    return crisis;
  }

  if (typeof crisis.baseSuccessDelta !== "number") {
    crisis.baseSuccessDelta = crisis.successDelta;
    crisis.baseFailureDelta = crisis.failureDelta;
  }
  crisis.successDelta = crisis.baseSuccessDelta + modifier.good;
  crisis.failureDelta = crisis.baseFailureDelta + modifier.bad;
  return crisis;
}

function decorateRunCrises(crises) {
  const preset = currentDifficulty();
  crises.forEach((crisis) => {
    applySeverityToCrisis(crisis, crisis.category === "stable-check" ? "düşük" : "orta");
    const protocol = protocolTextFor(crisis);
    if (protocol && Math.random() < 0.58) {
      crisis.evidence = [...crisis.evidence, { label: "Ön Adım", value: protocol }];
    }
  });

  const criticalCandidates = crises.filter((crisis) => crisis.category !== "stable-check");
  const criticalCount = Math.min(
    preset.criticalMax,
    Math.max(
      preset.criticalMin,
      preset.criticalMin +
        Math.floor(Math.random() * (preset.criticalMax - preset.criticalMin + 1))
    )
  );
  sample(criticalCandidates, criticalCount).forEach((crisis) => applySeverityToCrisis(crisis, "kritik"));

  const elevatedPool = criticalCandidates.filter((crisis) => crisis.severity !== "kritik");
  sample(elevatedPool, Math.min(preset.elevatedCount, elevatedPool.length)).forEach((crisis) =>
    applySeverityToCrisis(crisis, "yüksek")
  );

  return crises;
}

function ensureCategory(selected, pool, category) {
  if (selected.some((crisis) => crisis.category === category)) {
    return selected;
  }

  const replacement = pick(pool.filter((crisis) => crisis.category === category));
  const replaceIndex = selected.findIndex(
    (crisis) => !["stable-check", "core-sync-final"].includes(crisis.category)
  );

  if (replacement && replaceIndex >= 0) {
    selected[replaceIndex] = replacement;
  }

  return selected;
}

function pickDistinctCategories(pool, count) {
  const groups = new Map();
  pool.forEach((crisis) => {
    if (!groups.has(crisis.category)) {
      groups.set(crisis.category, []);
    }
    groups.get(crisis.category).push(crisis);
  });

  const picks = [];
  shuffle([...groups.entries()]).forEach(([, entries]) => {
    picks.push(pick(entries));
  });

  return shuffle(picks).slice(0, count);
}

function crisisTemplates() {
  const pool = [];

  [
    {
      id: "model-shift-0",
      title: "Yörünge Hesaplayıcısı Tutarsız Sonuç Veriyor",
      text: "Kontrol yazılımı elektronu tek bir sabit rota üstünden hesaplamaya çalışıyor. Yaklaşımın doğruluğunu değerlendir.",
      evidence: [
        { label: "Hesaplama", value: "sabit dairesel yol varsayımı" },
        { label: "Belirti", value: "olasılık bölgesi yerine tek rota üretiliyor" },
        { label: "Durum", value: "hesap ile veri uyumsuz" },
      ],
      options: [
        { text: "Bu yaklaşım eski kaldı; orbital yani bulunma olasılığı yüksek bölge mantığına geçilmeli.", correct: true, delta: 12, feedback: "Sistem modern atom yorumuna geçirildi.", whyWrong: "" },
        { text: "Elektronun yeri ve hızı aynı anda kesin belirlenebilir; sistem doğru çalışıyor.", correct: false, delta: -10, feedback: "Belirsizlik ilkesi yok sayıldı.", whyWrong: "Modern atom modelinde elektron klasik anlamda kesin yörüngede izlenmez." },
        { text: "Yalnız çok elektronlu atomlarda değil, her durumda tek doğru model Bohr yörüngesidir.", correct: false, delta: -9, feedback: "Eski model gereksizce genellendi.", whyWrong: "Bohr modeli sınırlıdır; modern model tüm atom yapısını onunla açıklamaz." },
        { text: "Orbital ile yörünge aynı şeydir, sadece isim farkı vardır.", correct: false, delta: -9, feedback: "Temel kavramlar karıştırıldı.", whyWrong: "Yörünge ile orbital aynı kavram değildir." },
        { text: "Bu sorun sadece sıcaklık düşürülerek çözülür.", correct: false, delta: -7, feedback: "Model hatası fiziksel soğutmayla çözülmedi.", whyWrong: "Buradaki hata modelleme biçimindeydi, sıcaklık sorunu değildi." },
      ],
    },
    {
      id: "model-shift-1",
      title: "Spektrum Çözümleyicisi Çoklu Kayıtta Zorlandı",
      text: "Eski spektrum modülü tek elektronlu hatlarda çalıştı ama çok elektronlu türde kararsız sonuç verdi. En mantıklı yorumu seç.",
      evidence: [
        { label: "Kayıt", value: "tek elektronlu hatta uyumlu" },
        { label: "Arıza", value: "çok elektronlu türde açıklama bozuldu" },
        { label: "Durum", value: "aynı yaklaşım tüm kayıtlarda tutmuyor" },
      ],
      options: [
        { text: "Bohr modeli burada yetersiz kaldı; daha genel kuantum yaklaşımına geçilmeli.", correct: true, delta: 12, feedback: "Model sınırı doğru okundu.", whyWrong: "" },
        { text: "Bu durum, tüm modern atom bilgisinin yanlış olduğunu gösterir.", correct: false, delta: -10, feedback: "Tek bir arıza tüm kuramı çökertti sanıldı.", whyWrong: "Buradaki sorun modern modelin değil, eski modelin sınırıyla ilgilidir." },
        { text: "Çok elektronlu türlerde de aynı dairesel yörünge hesabı yeterlidir.", correct: false, delta: -9, feedback: "Yetersiz model zorla sürdürülmeye çalışıldı.", whyWrong: "Bohr yaklaşımı çok elektronlu atomlarda yeterli açıklama vermez." },
        { text: "Sorun yalnızca proton sayısını artırarak çözülür.", correct: false, delta: -8, feedback: "Model sınırı çekirdek yüküne bağlandı.", whyWrong: "Buradaki mesele proton sayısı değil, modelin açıklama gücüdür." },
        { text: "Elektronların varlığı reddedilmelidir; problem buradan kaynaklanıyor.", correct: false, delta: -11, feedback: "Sistem fizik dışına savruldu.", whyWrong: "Sorun elektronun varlığı değil, eski modelin onu ele alış biçimidir." },
      ],
    },
  ].forEach((item) => pool.push(buildChoiceCrisis({ category: "model-shift", ...item })));

  [
    { visual: "1s", correct: "1s", title: "Orbital Yüzeyi Kaydı" },
    { visual: "2px", correct: "2px", title: "Orbital Yüzeyi Kaydı" },
    { visual: "2py", correct: "2py", title: "Orbital Yüzeyi Kaydı" },
    { visual: "2pz", correct: "2pz", title: "Orbital Yüzeyi Kaydı" },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "orbital-visual",
        id: `orbital-visual-${index}`,
        title: item.title,
        text: "Tarama paneli bir orbital yüzeyi çizimi gönderdi. Çizime en uygun orbital etiketini seç.",
        evidence: [
          { label: "Çizim", value: orbitalVisualMarkup(item.visual) },
          { label: "Durum", value: "yüzey tanımı doğrulanıyor" },
          { label: "Sınır", value: "yalnız 1s ve 2p eksenleri kullanılıyor" },
        ],
        options: [
          { text: "1s", correct: item.correct === "1s", delta: item.correct === "1s" ? 12 : -8, feedback: item.correct === "1s" ? "Orbital etiketi doğru okundu." : "Çizim yanlış etiketle yorumlandı.", whyWrong: item.correct === "1s" ? "" : "Bu çizim 1s değildi." },
          { text: "2px", correct: item.correct === "2px", delta: item.correct === "2px" ? 12 : -8, feedback: item.correct === "2px" ? "Orbital etiketi doğru okundu." : "Çizim yanlış etiketle yorumlandı.", whyWrong: item.correct === "2px" ? "" : "Bu çizim 2px değildi." },
          { text: "2py", correct: item.correct === "2py", delta: item.correct === "2py" ? 12 : -8, feedback: item.correct === "2py" ? "Orbital etiketi doğru okundu." : "Çizim yanlış etiketle yorumlandı.", whyWrong: item.correct === "2py" ? "" : "Bu çizim 2py değildi." },
          { text: "2pz", correct: item.correct === "2pz", delta: item.correct === "2pz" ? 12 : -8, feedback: item.correct === "2pz" ? "Orbital etiketi doğru okundu." : "Çizim yanlış etiketle yorumlandı.", whyWrong: item.correct === "2pz" ? "" : "Bu çizim 2pz değildi." },
          { text: "Bu çizim bir yörüngeyi gösterir, orbital bilgisi vermez.", correct: false, delta: -9, feedback: "Yörünge ve orbital kavramı karıştırıldı.", whyWrong: "Çizim orbital yüzeyini temsil ediyordu; yörünge gibi okunmamalıydı." },
        ],
      })
    );
  });

  [
    {
      atom: "Na",
      bank: ["2p6", "1s2", "3p1", "3s1", "2s2", "3d1", "4s1", "2p5", "3s2", "3p5"],
      target: ["1s2", "2s2", "2p6", "3s1"],
      title: "Sodyum Akış Dizisi",
      text: "Enerji kanalları sıradan çıktı. Son kayıt dış hatta savrulmadan önce temel akışı yeniden kurman gerekiyor.",
    },
    {
      atom: "Mg",
      bank: ["3p2", "2p6", "1s2", "3s2", "2s2", "4s2", "3d2", "2p5", "3s1", "3p6"],
      target: ["1s2", "2s2", "2p6", "3s2"],
      title: "Magnezyum Dizilim Sırası",
      text: "Çekirdek yazılımı enerji basamaklarını karıştırdı. Son kanalın açılabilmesi için temel sıralama geri kurulmalı.",
    },
    {
      atom: "Al",
      bank: ["2p6", "1s2", "3p1", "4s1", "2s2", "3s2", "3d1", "2p5", "3p5", "3s1"],
      target: ["1s2", "2s2", "2p6", "3s2", "3p1"],
      title: "Alüminyum Hattı Akış Kırılması",
      text: "Elektron yolları yeniden eşlenmeden son bölme güvenli biçimde çözülemiyor.",
    },
    {
      atom: "K",
      bank: ["3p6", "1s2", "4s1", "2p6", "3s2", "2s2", "3d1", "4p1", "2p5", "3p5", "4s2"],
      target: ["1s2", "2s2", "2p6", "3s2", "3p6", "4s1"],
      title: "Potasyum Basamak Yenileme",
      text: "Yükselen enerji kanalları hatalı sıraya dizildi. Sistemin yeniden sıraya ihtiyacı var.",
    },
  ].forEach((item, index) => {
    pool.push(
      buildSequenceCrisis({
        category: "aufbau",
        id: `aufbau-${index}`,
        title: item.title,
        text: item.text,
        evidence: [
          { label: "Tür", value: item.atom },
          { label: "Belirti", value: "enerji basamak sırası bozuldu" },
          { label: "Kayıt", value: "son kanal erken açılmaya çalıştı" },
        ],
        relatedSymbols: [item.atom],
        deepIntel: { label: "Derin tanı", value: "Dış katman verisi erken açılan kanal ihtimalini doğruluyor." },
        sequenceBank: item.bank,
        sequenceTarget: item.target,
        successText: "Orbital akışı doğru sıraya döndü.",
        successDelta: 13,
        failureText: "Düşük enerji kanalları tamamlanmadan üst basamak açıldı.",
        failureDelta: -11,
        failureWhy: "Aufbau sırası yanlış kuruldu; sistem daha düşük enerjili bölmeler dolmadan üst kanala çıktı.",
        bootLog: "Dizilim modülü açıldı. Enerji akışı yeniden kurulmalı.",
      })
    );
  });

  [
    { atom: "O", region: "2p" },
    { atom: "Ne", region: "2p" },
    { atom: "Cl", region: "3p" },
    { atom: "P", region: "3p" },
  ].forEach((item, index) => {
    const quantumLine = item.region === "2p" ? "n = 2, l = 1, m = 0, ms = +" : "n = 3, l = 1, m = 0, ms = +";
    pool.push(
      buildChoiceCrisis({
        category: "pauli",
        id: `pauli-${index}`,
        title: `${item.atom} Kayıt Çakışması`,
        text: "İki kuantum kaydı aynı imzayla sisteme düştü. Bu kayıt seti için en uygun müdahaleyi seç.",
        evidence: [
          { label: "Tür", value: item.atom },
          { label: "Bölge", value: item.region },
          { label: "Kayıt A", value: quantumLine },
          { label: "Kayıt B", value: quantumLine },
        ],
        relatedSymbols: [item.atom],
        deepIntel: { label: "Derin tanı", value: "Aynı orbitalin kapasite ve spin kuralı ihlal sınırında." },
        options: [
          {
            text: "İkinci kaydın ms işaretini ters çevir.",
            correct: true,
            delta: 14,
            feedback: "Aynı kutuda zıt spin dengesi geri kuruldu.",
            whyWrong: "",
          },
          {
            text: "Kutuyu kapatmak için bir elektron daha ekle.",
            correct: false,
            delta: -14,
            feedback: "Orbital kapasitesi aşıldı.",
            whyWrong: "Bir orbital kutusu iki elektrondan fazlasını alamaz.",
          },
          {
            text: "Sorunu enerji düşürerek bastır, spinleri bırak.",
            correct: false,
            delta: -8,
            feedback: "Sorun enerji değil, spin düzeniydi.",
            whyWrong: "Pauli sorunu enerji azaltmakla değil, spin düzenini düzeltmekle çözülür.",
          },
          {
            text: "Kutudaki iki elektronu da dış seviyeye taşı.",
            correct: false,
            delta: -10,
            feedback: "Gereksiz kaçış kararsızlığı büyüttü.",
            whyWrong: "Temel kural ihlalini çözmeden elektronları kaçırmak yeni enerji sorunu doğurdu.",
          },
          {
            text: "Durumu normal kabul edip izlemeye devam et.",
            correct: false,
            delta: -9,
            feedback: "Fiziksel olmayan dolum yok sayıldı.",
            whyWrong: "Aynı kutuda aynı spinle durmak kararlı bir durum değildir.",
          },
        ],
      })
    );
  });

  [
    { atom: "N", region: "2p", pattern: "[↑↓] [ ] [ ]" },
    { atom: "P", region: "3p", pattern: "[↑↓] [ ] [ ]" },
    { atom: "O", region: "2p", pattern: "[↑↓] [↑↓] [ ]" },
    { atom: "S", region: "3p", pattern: "[↑↓] [↑↓] [ ]" },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "hund",
        id: `hund-${index}`,
        title: `${item.atom} Eş Enerjili Kutu Kararı`,
        text: "Sistem eş enerjili kutuları erken eşleştirmeye meyilli. Düzeni değerlendirip doğru protokolü seç.",
        evidence: [
          { label: "Tür", value: item.atom },
          { label: "Bölge", value: item.region },
          { label: "Gözlem", value: item.pattern },
        ],
        relatedSymbols: [item.atom],
        deepIntel: { label: "Derin tanı", value: "Manyetik gürültü, kutular arası dengesiz paylaşımı destekliyor." },
        options: [
          {
            text: "Eş enerjili kutulara önce tek tek elektron dağıt.",
            correct: true,
            delta: 13,
            feedback: "Hund düzeni geri geldi. Kutular doğru paylaşımı aldı.",
            whyWrong: "",
          },
          {
            text: "İlk kutu dolmadan diğer kutulara geçme.",
            correct: false,
            delta: -13,
            feedback: "Erken eşleşme sürdürülmüş oldu.",
            whyWrong: "Eş enerjili kutular önce tekli dolmalı, ilk kutuyu doldurmak doğru yaklaşım değil.",
          },
          {
            text: "Bir elektronu üst enerji düzeyine taşıyıp alanı boşalt.",
            correct: false,
            delta: -9,
            feedback: "Üst seviyeye kaçış gereksiz enerji yükü bindirdi.",
            whyWrong: "Sorun eş enerjili kutuların doldurulma mantığıydı; üst seviyeye çıkmak çözüm değil.",
          },
          {
            text: "Durumu normal kabul edip sadece izlemeye al.",
            correct: false,
            delta: -7,
            feedback: "Yanlış paylaşım izlemeye bırakıldı.",
            whyWrong: "Eş enerjili kutulardaki erken eşleşme fiziksel dengeyi bozar; pas geçilemez.",
          },
          {
            text: "Kutuların tümünü aynı anda kapat ve veri akışını kes.",
            correct: false,
            delta: -10,
            feedback: "Veri akışı kesildi ama temel düzen bozuk kaldı.",
            whyWrong: "Akışı durdurmak kutu dağılımı kuralını düzeltmez.",
          },
        ],
      })
    );
  });

  [
    { card: "n = 2, l = 2", channel: "2d", valid: false },
    { card: "n = 3, l = 3", channel: "3f", valid: false },
    { card: "n = 1, l = 1", channel: "1p", valid: false },
    { card: "n = 2, l = -1", channel: "negatif l", valid: false },
    { card: "n = 4, l = 4", channel: "4g", valid: false },
    { card: "n = 2, l = 1", channel: "2p", valid: true },
    { card: "n = 3, l = 2", channel: "3d", valid: true },
    { card: "n = 1, l = 0", channel: "1s", valid: true },
    { card: "n = 4, l = 3", channel: "4f", valid: true },
  ].forEach((item, index) => {
    pool.push(
      buildCommandCrisis({
        category: "quantum-card",
        id: `quantum-${index}`,
        title: "Kuantum Kartı Doğrulama",
        text: "Kimlik kartı verisi terminale düştü. Kartın fiziksel olarak kabul edilip edilmeyeceğine sen karar vereceksin.",
        evidence: [
          { label: "Kart", value: item.card },
          { label: "Açılan hat", value: item.channel },
          { label: "Durum", value: "kimlik kartı doğrulama bekliyor" },
        ],
        bootLog: "Kuantum kimlik kartı terminale yönlendirildi.",
        validate: (command) => (item.valid ? isAcceptCommand(command) : isRejectCommand(command)),
        expectedCommand: item.valid ? "kartı-kabul-et" : "kartı-reddet",
        successText: item.valid
          ? "Geçerli kart kabul edildi. Hat güvenle açıldı."
          : "Geçersiz kart reddedildi. Hat sisteme işlenmedi.",
        successDelta: 13,
        failureText: item.valid
          ? "Geçerli kart boş yere reddedildi. İşlem hattı tıkandı."
          : "Geçersiz kart kabul edildi. Fiziksel olmayan kanal açıldı.",
        failureDelta: -12,
        failureWhy: item.valid
          ? "Kart fiziksel olarak tutarlıydı; reddetmek gereksiz engelleme yarattı."
          : "Bu kuantum kartı fiziksel olarak tutarsızdı; reddetmek yerine kabul etmek orbital hatasına yol açtı.",
        correctWhy: item.valid
          ? "Bu kartta n ve l değerleri birbirini destekliyor; fiziksel olarak açılabilecek bir orbital tanımı veriyor."
          : "Bu kartta n ve l birlikte fiziksel sınırı aşıyor; böyle bir orbital aynı anda açılamaz.",
      })
    );
  });

  [
    { neutral: "Na", ion: "Na+", symbol: "Na" },
    { neutral: "Mg", ion: "Mg2+", symbol: "Mg" },
    { neutral: "Cl", ion: "Cl-", symbol: "Cl" },
    { neutral: "O", ion: "O2-", symbol: "O" },
    { neutral: "S", ion: "S2-", symbol: "S" },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "ion-radius",
        id: `ion-radius-${index}`,
        title: "İyon Kanalı Geometri Değerlendirmesi",
        text: `${item.neutral} ve ${item.ion} için tek tip kapı çapı tanımlandı. Durumu değerlendirip doğru yaklaşımı seç.`,
        evidence: [
          { label: "Çift", value: `${item.neutral} / ${item.ion}` },
          { label: "Belirti", value: "kanal uyumsuzluğu" },
          { label: "Kayıt", value: "yük değişimi sonrası kapı tepkisi değişti" },
        ],
        relatedSymbols: [item.symbol],
        deepIntel: { label: "Derin tanı", value: "Kapı yüzeyi, yük değişimi sonrası boyut farkına işaret ediyor." },
        scanRequired: true,
        options: [
          {
            text: item.ion.includes("+") ? `${item.ion} hattını daha dar kabul et.` : `${item.ion} hattını daha geniş kabul et.`,
            correct: true,
            delta: 14,
            feedback: "Geometri modeli doğru yöne çekildi.",
            whyWrong: "",
          },
          {
            text: "İki türü de aynı kapı boyutunda tut.",
            correct: false,
            delta: -12,
            feedback: "Yük değişimi görmezden gelindi.",
            whyWrong: "Yük değiştiğinde elektron sayısı ve alan geometrisi de değişebilir; aynı boyutta tutmak hatalıydı.",
          },
          {
            text: item.ion.includes("+") ? `${item.ion} hattını daha geniş kabul et.` : `${item.ion} hattını daha dar kabul et.`,
            correct: false,
            delta: -10,
            feedback: "İyon yönü ters yorumlandı.",
            whyWrong: "İyonun boyut değişimi ters yönde yorumlandı.",
          },
          {
            text: "Boyut yerine yalnızca sıcaklığı düşür.",
            correct: false,
            delta: -7,
            feedback: "Geometri sorunu sıcaklıkla çözülmedi.",
            whyWrong: "Sorun termal değil, iyon boyut modeliydi.",
          },
          {
            text: "Sorun yok deyip hattı izlemeye bırak.",
            correct: false,
            delta: -8,
            feedback: "Gerçek geometri hatası yok sayıldı.",
            whyWrong: "Burada gerçekten boyut farkı vardı; pas geçmek kararsızlığı büyüttü.",
          },
        ],
      })
    );
  });

  [
    { low: "Na", high: "Ne" },
    { low: "K", high: "Ca" },
    { low: "Na", high: "Mg" },
    { low: "Al", high: "Ne" },
    { low: "Na", high: "Ar" },
    { low: "Na", high: "F" },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "ionization",
        id: `ionization-${index}`,
        title: "Koparma Gücü Dağıtımı",
        text: "Sistem iki farklı tür için aynı koparma gücünü kullanıyor. Güç haritasını değerlendir.",
        evidence: [
          { label: "Çift", value: `${item.low} / ${item.high}` },
          { label: "Belirti", value: "iki tür tek koparma eşiğine bağlandı" },
          { label: "Kayıt", value: "enerji dağılımı dengesizleşti" },
        ],
        relatedSymbols: [item.low, item.high],
        deepIntel: { label: "Derin tanı", value: "Dirençli hat daha sıkı elektron tutuyor gibi görünüyor." },
        scanRequired: true,
        requireAllScans: true,
        options: [
          {
            text: `${item.high} için daha yüksek koparma gücü uygula.`,
            correct: true,
            delta: 14,
            feedback: "Güç haritası doğru yönde ayrıştırıldı.",
            whyWrong: "",
          },
          {
            text: "İki tür için de aynı gücü koru.",
            correct: false,
            delta: -13,
            feedback: "Tek eşik dayatması sürdü.",
            whyWrong: "İyonlaşma enerjisi her tür için aynı değildir; tek eşik yanlış bir genellemedir.",
          },
          {
            text: `${item.low} için daha yüksek koparma gücü uygula.`,
            correct: false,
            delta: -10,
            feedback: "Yüksek eşik yanlış türe verildi.",
            whyWrong: "Daha dirençli tür yerine daha gevşek tür hedef alındı.",
          },
          {
            text: "Güç farkını kapatmak için her iki hatta da maksimum güç ver.",
            correct: false,
            delta: -11,
            feedback: "Aşırı güç sistemi daha da zorladı.",
            whyWrong: "Maksimum güç yaklaşımı seçici değildir; yalnızca yeni dengesizlik üretir.",
          },
          {
            text: "Bu sadece ölçüm gürültüsü deyip sistemi izlemeye al.",
            correct: false,
            delta: -8,
            feedback: "Gerçek güç farkı görmezden gelindi.",
            whyWrong: "Belirtiler gerçek koparma eşiği farkına işaret ediyordu; yalnız gürültü değildi.",
          },
        ],
      })
    );
  });

  [
    { title: "Ardışık Koparma Kaydı", jumpAfter: 1, values: ["496", "4562", "6910", "9543"] },
    { title: "Ardışık Koparma Kaydı", jumpAfter: 2, values: ["738", "1451", "7733", "10540"] },
    { title: "Ardışık Koparma Kaydı", jumpAfter: 3, values: ["578", "1817", "2745", "11578"] },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "jump-table",
        id: `jump-table-${index}`,
        title: item.title,
        text: "Ardışık iyonlaşma enerjisi tablosu tek atomdan geldi. Tablodan en uygun yorumu seç.",
        evidence: [
          { label: "Tablo", value: ionizationTableMarkup(item.values) },
          { label: "Yorum Alanı", value: "değerlik elektron sayısı tahmini" },
        ],
        deepIntel: { label: "Derin Tanı", value: "Basamaklar arasındaki farkları birlikte değerlendir." },
        options: [
          {
            text: `${item.jumpAfter} değerlik elektronu vardır.`,
            correct: true,
            delta: 13,
            feedback: "Sıçrama doğru yorumlandı. Dış katman sayısı tutarlı okundu.",
            whyWrong: "",
          },
          {
            text: `${item.jumpAfter + 1} değerlik elektronu vardır.`,
            correct: false,
            delta: -10,
            feedback: "Sıçrama bir basamak geç yorumlandı.",
            whyWrong: "Büyük sıçrama, dış katman bittikten sonraki basamakta beklenir; bir fazla sayıldı.",
          },
          {
            text: "Bu tablo değerlik değil, yalnızca sıcaklık hatasını gösterir.",
            correct: false,
            delta: -8,
            feedback: "Enerji verisi yanlış türde yorumlandı.",
            whyWrong: "Ardışık iyonlaşma verisi yalnızca sıcaklık gürültüsü olarak okunamaz.",
          },
          {
            text: "Tüm atomlarda aynı yerden sıçrama olmalı, veri geçersiz sayılmalıdır.",
            correct: false,
            delta: -9,
            feedback: "Atomlar arası fark yok sayıldı.",
            whyWrong: "Ardışık iyonlaşma davranışı atomdan atoma değişir; tek tip sıçrama beklenmez.",
          },
          {
            text: "Sıçrama varsa proton sayısı değişmiştir.",
            correct: false,
            delta: -9,
            feedback: "Enerji sıçraması çekirdek değişimi sanıldı.",
            whyWrong: "Buradaki yorum çekirdeğin değişmesini değil, elektron koparma basamaklarını ilgilendirir.",
          },
        ],
      })
    );
  });

  [
    {
      id: "trend-graph-0",
      title: "Periyot Yarıçap Grafiği",
      text: "Aynı periyottaki türler için bir yarıçap eğrisi geldi. Grafiği en iyi yorumlayan seçeneği seç.",
      graph: trendGraphMarkup(["Na", "Mg", "Al", "P", "Cl"], [186, 160, 143, 110, 99]),
      correctWhy: "Aynı periyotta etkili çekirdek çekimi arttıkça elektronlar çekirdeğe daha güçlü yaklaşır; yarıçap genel olarak küçülür.",
      options: [
        {
          text: "Aynı periyotta sağa gidildikçe atom yarıçapı genel olarak azalır.",
          correct: true,
          delta: 13,
          feedback: "Grafik doğru okundu.",
          whyWrong: "",
        },
        {
          text: "Aynı periyotta sağa gidildikçe katman sayısı arttığı için yarıçap büyür.",
          correct: false,
          delta: -10,
          feedback: "Katman sayısı yorumu yanlış kuruldu.",
          whyWrong: "Aynı periyotta katman sayısı sabit kalır; değişen temel etki çekirdek çekimidir.",
        },
        {
          text: "Bu grafik yalnız sıcaklık farkını gösterir; periyodik yorum yapılamaz.",
          correct: false,
          delta: -8,
          feedback: "Periyodik veri sıcaklık gürültüsüne indirgendı.",
          whyWrong: "Grafik periyodik değişim yorumuna uygundu; yalnız sıcaklık verisi değildi.",
        },
        {
          text: "Sağa gidildikçe elektronlar çoğaldığı için yarıçap mutlaka büyür.",
          correct: false,
          delta: -9,
          feedback: "Elektron sayısı tek başına yorumlandı.",
          whyWrong: "Elektron sayısı artsa da etkili çekirdek çekimi baskın olabilir; yarıçap bu yüzden küçülebilir.",
        },
        {
          text: "Bu eğri yalnız geçiş metalleri için geçerlidir.",
          correct: false,
          delta: -8,
          feedback: "Grafik yanlış sınıfa bağlandı.",
          whyWrong: "Buradaki eğilim baş grup elementlerinde de modern atom teorisiyle yorumlanır.",
        },
      ],
    },
    {
      id: "trend-graph-1",
      title: "Koparma Eğrisi Kaydı",
      text: "Aynı periyottaki türler için ilk koparma eşiği grafiği geldi. En uygun yorumu seç.",
      graph: trendGraphMarkup(["Na", "Mg", "Al", "Si", "P"], [496, 738, 578, 786, 1012]),
      correctWhy: "İyonlaşma enerjisi aynı periyotta genel olarak artar; ancak alt düzey kararlılığı nedeniyle küçük sapmalar görülebilir.",
      options: [
        {
          text: "Genel eğilim artış yönlüdür; ancak tekdüze olmak zorunda değildir.",
          correct: true,
          delta: 13,
          feedback: "Grafikteki ana yön ve sapma birlikte okundu.",
          whyWrong: "",
        },
        {
          text: "İlk koparma eşiği aynı periyotta sürekli azalmalıdır.",
          correct: false,
          delta: -10,
          feedback: "Genel yön ters okundu.",
          whyWrong: "Aynı periyotta elektron koparmak genel olarak zorlaşır; eğilim azalış değil artış yönlüdür.",
        },
        {
          text: "Grafikteki her kırılma proton sayısının değiştiğini gösterir.",
          correct: false,
          delta: -9,
          feedback: "Grafik çekirdek değişimine bağlandı.",
          whyWrong: "Buradaki küçük kırılmalar çekirdek değişimini değil orbital kararlılığı gibi etkileri gösterebilir.",
        },
        {
          text: "İlk koparma eşiği ile periyot ilişkisi kurulamaz.",
          correct: false,
          delta: -8,
          feedback: "Periyodik yorum reddedildi.",
          whyWrong: "İyonlaşma enerjisi periyodik sistem eğilimleriyle güçlü biçimde ilişkilidir.",
        },
        {
          text: "Grafiğe göre soldan sağa gidildikçe elektronlar daha gevşek tutulur.",
          correct: false,
          delta: -9,
          feedback: "Tutulma yorumu ters kuruldu.",
          whyWrong: "Genel artış, elektronların çoğunlukla daha sıkı tutulduğunu düşündürür.",
        },
      ],
    },
    {
      id: "trend-graph-2",
      title: "İzoelektronik Boyut Grafiği",
      text: "Elektron sayısı aynı olan türler için boyut eğrisi verildi. En mantıklı yorumu seç.",
      graph: trendGraphMarkup(["N3-", "O2-", "F-", "Na+", "Mg2+"], [146, 140, 133, 102, 72]),
      correctWhy: "İzoelektronik türlerde proton sayısı arttıkça elektronlar daha güçlü çekilir ve yarıçap küçülür.",
      options: [
        {
          text: "Elektron sayısı aynıyken proton sayısı arttıkça yarıçap küçülür.",
          correct: true,
          delta: 14,
          feedback: "İzoelektronik eğri doğru yorumlandı.",
          whyWrong: "",
        },
        {
          text: "Elektron sayısı aynıysa bütün türlerin yarıçapı aynıdır.",
          correct: false,
          delta: -10,
          feedback: "İzoelektronik yorum yüzeyde kaldı.",
          whyWrong: "Elektron sayısı eşit olsa da çekirdek yükü farklıysa yarıçaplar farklı olabilir.",
        },
        {
          text: "Bu grafikte tek belirleyici katman sayısıdır.",
          correct: false,
          delta: -8,
          feedback: "Belirleyici etki eksik okundu.",
          whyWrong: "İzoelektronik türlerde katman sayısından çok proton sayısındaki fark belirleyicidir.",
        },
        {
          text: "Katyonlar her zaman anyonlardan daha fazla elektrona sahiptir.",
          correct: false,
          delta: -9,
          feedback: "İyon kavramı ters okundu.",
          whyWrong: "Katyonlar elektron kaybetmiş, anyonlar elektron kazanmış türlerdir.",
        },
        {
          text: "İzoelektronik türler için çekirdek yükü dikkate alınmaz.",
          correct: false,
          delta: -10,
          feedback: "Çekirdek yükü etkisi yok sayıldı.",
          whyWrong: "Tam tersine, izoelektronik türleri ayıran temel etki çekirdek yüküdür.",
        },
      ],
    },
  ].forEach((item) => {
    pool.push(
      buildChoiceCrisis({
        category: "trend-graph",
        id: item.id,
        title: item.title,
        text: item.text,
        evidence: [
          { label: "Grafik", value: item.graph },
          { label: "İstek", value: "Eğrinin anlattığı periyodik yorumu seç." },
        ],
        correctWhy: item.correctWhy,
        options: item.options,
      })
    );
  });

  [
    {
      id: "table-check-0",
      title: "Yer-Bulma Tablosu",
      text: "Tablodaki satırlardan biri modern atom teorisiyle tutarlı değil. Bozuk satırı seç.",
      table: genericTableMarkup(
        ["Satır", "Son Elektron", "Blok", "Periyot"],
        [
          ["A", "3p", "p", "3"],
          ["B", "4s", "s", "4"],
          ["C", "3d", "p", "4"],
          ["D", "2p", "p", "2"],
          ["E", "1s", "s", "1"],
        ]
      ),
      correctWhy: "3d ile sonlanan satır d blokta olmalıdır; p blok olarak etiketlenmesi tutarsızdır.",
      correct: "C satırı bozuk.",
      wrongs: [
        "A satırı bozuk.",
        "B satırı bozuk.",
        "D satırı bozuk.",
        "E satırı bozuk.",
      ],
    },
    {
      id: "table-check-1",
      title: "İyon Davranışı Tablosu",
      text: "Tablodaki yorumlardan biri fiziksel olarak tutarsız. Tutarsız olan satırı seç.",
      table: genericTableMarkup(
        ["Satır", "Tür", "Yorum"],
        [
          ["A", "Na+", "nötr Na atomundan küçüktür"],
          ["B", "Cl-", "nötr Cl atomundan büyüktür"],
          ["C", "Mg2+", "proton sayısı 2 azalır"],
          ["D", "O2-", "elektron sayısı artar"],
          ["E", "K", "4s elektronu dış katmandadır"],
        ]
      ),
      correctWhy: "İyon oluşurken proton sayısı değişmez; Mg2+ için proton sayısı 2 azalır yorumu hatalıdır.",
      correct: "C satırı bozuk.",
      wrongs: [
        "A satırı bozuk.",
        "B satırı bozuk.",
        "D satırı bozuk.",
        "E satırı bozuk.",
      ],
    },
  ].forEach((item) => {
    pool.push(
      buildChoiceCrisis({
        category: "table-check",
        id: item.id,
        title: item.title,
        text: item.text,
        evidence: [
          { label: "Tablo", value: item.table },
          { label: "İstek", value: "Tutarsız olan satırı seç." },
        ],
        correctWhy: item.correctWhy,
        options: shuffle([
          {
            text: item.correct,
            correct: true,
            delta: 13,
            feedback: "Bozuk satır doğru ayıklandı.",
            whyWrong: "",
          },
          ...item.wrongs.map((text) => ({
            text,
            correct: false,
            delta: -9,
            feedback: "Tutarlı satır gereksiz yere bozuk sayıldı.",
            whyWrong: "Tablodaki yorumlar karşılaştırılırken temel modern atom ilkelerinden biri yanlış okundu.",
          })),
        ]),
      })
    );
  });

  [
    { card: "n = 3, l = 1", wrong: "3d", right: "3p" },
    { card: "n = 2, l = 0", wrong: "2p", right: "2s" },
    { card: "n = 4, l = 1", wrong: "4d", right: "4p" },
  ].forEach((item, index) => {
    pool.push(
      buildCommandCrisis({
        category: "orbital-label",
        id: `orbital-label-${index}`,
        title: "Orbital Etiketi Şüpheli",
        text: "Kimlik kartı ile açılan orbital etiketi uyuşmuyor gibi görünüyor. Hat türü terminal doğrulaması bekliyor.",
        evidence: [
          { label: "Kart", value: item.card },
          { label: "Açılan etiket", value: item.wrong },
          { label: "Durum", value: "hat türü doğrulanamıyor" },
        ],
        bootLog: "Orbital etiket düzeltmesi terminale yönlendirildi.",
        validate: (command) => command === `etiketle ${item.right.toLowerCase()}`,
        expectedCommand: `etiketle ${item.right.toLowerCase()}`,
        successText: `${item.right} etiketi geri yüklendi.`,
        successDelta: 12,
        failureText: "Yanlış orbital etiketi sistemde kaldı.",
        failureDelta: -11,
        failureWhy: "Karttaki l değeriyle uyuşmayan orbital etiketi korunmuş oldu.",
        correctWhy: `${item.card} verisi ${item.right} etiketiyle uyumludur; mevcut ${item.wrong} etiketi kuantum kartındaki l değerini yanlış yorumlar.`,
      })
    );
  });

  [
    { atom: "Na", wrong: "3p", right: "3s" },
    { atom: "Al", wrong: "4s", right: "3p" },
    { atom: "Cl", wrong: "4s", right: "3p" },
    { atom: "K", wrong: "3d", right: "4s" },
  ].forEach((item, index) => {
    pool.push(
      buildCommandCrisis({
        category: "manual-route",
        id: `manual-route-${index}`,
        title: "Elektron Hattı Manuel Yönlendirme",
        text: "İz sürücü, son elektronu yanlış enerji hattına bıraktı. Otomatik düzeltme kapalı; hedef hattı sen yazmalısın.",
        evidence: [
          { label: "Tür", value: item.atom },
          { label: "Mevcut hat", value: item.wrong },
          { label: "Durum", value: "manuel yönlendirme bekleniyor" },
        ],
        relatedSymbols: [item.atom],
        deepIntel: { label: "Derin tanı", value: "Son elektron daha düşük enerji veya doğru alt tür hattına geri çekilmeli." },
        scanRequired: true,
        bootLog: "Otomatik rota kilitlendi. Manuel hedef komutu bekleniyor.",
        validate: (command) => command === `yonlendir ${item.right.toLowerCase()}`,
        expectedCommand: `yonlendir ${item.right.toLowerCase()}`,
        successText: `${item.right} hattı elle seçildi. Elektron doğru yola döndü.`,
        successDelta: 13,
        failureText: "Elektron yanlış hatta kaldı. Alan dalgalanması sürdü.",
        failureDelta: -12,
        failureWhy: `Doğru komut ${item.right} hattına yönlendirmekti; elektron ${item.wrong} hattında bırakıldı.`,
        correctWhy: `${item.atom} için son elektron ${item.right} hattına yerleşmeliydi. ${item.wrong} hattı bu türün temel yerleşimini bozuyor.`,
      })
    );
  });

  [
    {
      id: "exception-match-cr",
      relatedSymbols: ["Cr", "Mn", "Fe"],
      assignItems: [
        {
          label: "Cr",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s² 3d⁴", "4s¹ 3d⁵", "4s² 3d⁶"],
          answer: "4s¹ 3d⁵",
        },
        {
          label: "Mn",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s² 3d⁵", "4s¹ 3d⁶", "4s² 3d⁴"],
          answer: "4s² 3d⁵",
        },
        {
          label: "Fe",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s¹ 3d⁷", "4s² 3d⁶", "4s² 3d⁵"],
          answer: "4s² 3d⁶",
        },
      ],
      failureWhy: "Krom için yarı dolu d alt düzeyi kararlılığı gözden kaçtı.",
      correctWhy: "Cr, beklenen 4s² 3d⁴ yerine daha kararlı yarı dolu düzen olan 4s¹ 3d⁵ ile bulunur; Mn ve Fe normal akışlarını korur.",
    },
    {
      id: "exception-match-cu",
      relatedSymbols: ["Cu", "Fe", "Mn"],
      assignItems: [
        {
          label: "Cu",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s² 3d⁹", "4s¹ 3d¹⁰", "4s² 3d¹⁰"],
          answer: "4s¹ 3d¹⁰",
        },
        {
          label: "Fe",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s² 3d⁶", "4s¹ 3d⁷", "4s² 3d⁵"],
          answer: "4s² 3d⁶",
        },
        {
          label: "Mn",
          prompt: "Temel hâlde son iki alt düzey",
          options: ["4s² 3d⁵", "4s¹ 3d⁶", "4s² 3d⁴"],
          answer: "4s² 3d⁵",
        },
      ],
      failureWhy: "Bakır için tam dolu d alt düzeyi kararlılığı gözden kaçtı.",
      correctWhy: "Cu, beklenen 4s² 3d⁹ yerine daha kararlı tam dolu düzen olan 4s¹ 3d¹⁰ ile bulunur; Fe ve Mn normal düzenlerini korur.",
    },
  ].forEach((item) => {
    pool.push(
      buildAssignCrisis({
        category: "exception-match",
        title: "Son Alt Düzey Arşivi",
        text: "Arşiv motoru türlerin son iki alt düzey kaydını karıştırdı. Her türü en uygun son kayıtla eşleştir.",
        evidence: [
          { label: "Panel", value: "son alt düzey arşivi" },
          { label: "İstek", value: "her türü tek bir son kayıtla eşleştir" },
          { label: "Not", value: "kayıtlar temel hâl içindir" },
        ],
        successText: "Arşiv satırları kararlı son kayıtlarla eşleştirildi.",
        successDelta: 15,
        failureText: "İstisna kaydı yanlış satıra bağlandı.",
        failureDelta: -13,
        bootLog: "İstisna arşivi eşleştirme paneline aktarıldı.",
        ...item,
      })
    );
  });

  [
    {
      id: "quantum-map-0",
      title: "Kuantum Kartı Eşleme",
      text: "Kart arşivi üç kuantum kaydını orbital etiketiyle bağlayamadı. Her kaydı doğru etiketle eşleştir.",
      assignItems: [
        { label: "Kayıt 1", prompt: "n = 4, l = 2", options: ["4d", "4p", "4f"], answer: "4d" },
        { label: "Kayıt 2", prompt: "n = 2, l = 1", options: ["2s", "2p", "2d"], answer: "2p" },
        { label: "Kayıt 3", prompt: "n = 1, l = 0", options: ["1p", "1s", "1d"], answer: "1s" },
      ],
    },
    {
      id: "quantum-map-1",
      title: "Alt Düzey Kimlik Kartları",
      text: "Arşiv bu kez dört kaydı karıştırdı. Her kuantum satırını doğru orbital etiketiyle eşleştir.",
      assignItems: [
        { label: "Kayıt 1", prompt: "n = 3, l = 0", options: ["3p", "3s", "3d"], answer: "3s" },
        { label: "Kayıt 2", prompt: "n = 4, l = 1", options: ["4s", "4p", "4d"], answer: "4p" },
        { label: "Kayıt 3", prompt: "n = 3, l = 2", options: ["3p", "3d", "3f"], answer: "3d" },
        { label: "Kayıt 4", prompt: "n = 2, l = 0", options: ["2s", "2p", "2d"], answer: "2s" },
      ],
    },
    {
      id: "quantum-map-2",
      title: "Orbital Kimlik Arşivi",
      text: "Kayıt çözücü kuantum kartlarını orbital satırlarına yanlış bağladı. Her kartı doğru hedefe taşı.",
      assignItems: [
        { label: "Kayıt 1", prompt: "n = 5, l = 1", options: ["5s", "5p", "5d"], answer: "5p" },
        { label: "Kayıt 2", prompt: "n = 4, l = 0", options: ["4s", "4p", "4d"], answer: "4s" },
        { label: "Kayıt 3", prompt: "n = 4, l = 3", options: ["4d", "4f", "4p"], answer: "4f" },
      ],
    },
    {
      id: "quantum-map-3",
      title: "Kuantum Satırı Yönlendirme",
      text: "Terminale düşen kartlar doğru orbital adına çevrilemedi. Her satırı uygun etikete bağla.",
      assignItems: [
        { label: "Kayıt 1", prompt: "n = 2, l = 1", options: ["2s", "2p", "2d"], answer: "2p" },
        { label: "Kayıt 2", prompt: "n = 5, l = 2", options: ["5p", "5d", "5f"], answer: "5d" },
        { label: "Kayıt 3", prompt: "n = 3, l = 1", options: ["3s", "3p", "3d"], answer: "3p" },
        { label: "Kayıt 4", prompt: "n = 1, l = 0", options: ["1s", "1p", "1d"], answer: "1s" },
      ],
    },
    {
      id: "quantum-map-4",
      title: "Kuantum Etiket Çevirici",
      text: "Çevirici modül birkaç farklı kartı aynı anda kaçırdı. Her kuantum verisini doğru orbital etiketiyle eşleştir.",
      assignItems: [
        { label: "Kayıt 1", prompt: "n = 6, l = 0", options: ["6s", "6p", "6d"], answer: "6s" },
        { label: "Kayıt 2", prompt: "n = 4, l = 2", options: ["4p", "4d", "4f"], answer: "4d" },
        { label: "Kayıt 3", prompt: "n = 3, l = 1", options: ["3s", "3p", "3d"], answer: "3p" },
      ],
    },
  ].forEach((item) => {
    pool.push(
      buildAssignCrisis({
        category: "quantum-map",
        evidence: [
          { label: "Panel", value: "kuantum kart eşleme modülü" },
          { label: "İstek", value: "her satırı doğru orbital etiketiyle bağla" },
        ],
        successText: "Kuantum kartları doğru orbital kimliklerine bağlandı.",
        successDelta: 14,
        failureText: "Bir ya da daha fazla kart yanlış orbital etiketiyle bağlandı.",
        failureDelta: -12,
        failureWhy: "l değeri orbital türüne çevrilirken hata yapıldı.",
        correctWhy: "l = 0, 1, 2, 3 sırasıyla s, p, d, f orbital türlerini verir; baştaki n sayısı da katmanı belirler.",
        bootLog: "Kuantum kart eşleme paneli açıldı.",
        ...item,
      })
    );
  });

  [
    { formula: "Fe₂O₃", element: "Fe", answer: "+3", distractors: ["+2", "+4", "0", "-1"] },
    { formula: "KMnO₄", element: "Mn", answer: "+7", distractors: ["+5", "+6", "0", "-1"] },
    { formula: "HClO₃", element: "Cl", answer: "+5", distractors: ["+3", "+7", "0", "-1"] },
  ].forEach((item, index) => {
    pool.push(
      buildChoiceCrisis({
        category: "oxidation",
        id: `oxidation-${index}`,
        title: "Yükseltgenme Basamağı Etiketi",
        text: "Bileşik etiketinde alt türün yükseltgenme basamağı doğrulanamıyor. En uygun değeri seç.",
        evidence: [
          { label: "Bileşik", value: item.formula },
          { label: "Tür", value: item.element },
          { label: "Durum", value: "yük dengesi doğrulama bekliyor" },
        ],
        deepIntel: { label: "Derin Tanı", value: "Toplam yük dengesi sıfıra ya da iyon yüküne göre kurulmalı." },
        options: [
          { text: item.answer, correct: true, delta: 13, feedback: "Yükseltgenme basamağı doğru etiketlendi.", whyWrong: "" },
          ...item.distractors.map((value) => ({
            text: value,
            correct: false,
            delta: -9,
            feedback: "Yük dengesi yanlış kuruldu.",
            whyWrong: "Bileşikteki toplam yük hesabı doğru yapılmadı.",
          })),
        ],
      })
    );
  });

  [
    {
      id: "excited-state-0",
      title: "Magnezyum Geçiş Kaydı",
      text: "Alt düzey kaydı ile anlık elektron dağılımı tam çakışmıyor. Durumu en iyi yorumlayan seçeneği seç.",
      evidence: [
        { label: "Kayıt", value: "1s² 2s² 2p⁶ 3s¹ 3p¹" },
        { label: "Tür", value: "Mg hattı" },
        { label: "İstek", value: "durumu yorumla" },
      ],
      options: [
        { text: "Bu kayıt uyarılmış hâli gösterir; bir elektron daha yüksek alt düzeye çıkmıştır.", correct: true, delta: 13, feedback: "Geçiş kaydı doğru okundu.", whyWrong: "" },
        { text: "Bu dağılım temel hâlin kendisidir; ek enerji gerektirmez.", correct: false, delta: -10, feedback: "Uyarılmış kayıt temel hâl sanıldı.", whyWrong: "Elektron daha yüksek alt düzeye taşındığı için bu düzen temel hâl değildir." },
        { text: "Bu kayıt Mg²⁺ iyonuna aittir.", correct: false, delta: -10, feedback: "Nötr ve iyon kayıtları karıştırıldı.", whyWrong: "Buradaki toplam elektron sayısı Mg²⁺ değil, Mg için uyarılmış bir düzene karşılık gelir." },
        { text: "Bu dağılım p blok bir ametale aittir.", correct: false, delta: -8, feedback: "Blok yorumu yanlış kuruldu.", whyWrong: "Kayıttaki toplam elektron sayısı ve temel katman yapısı Mg çizgisini işaret eder." },
        { text: "Bu durum yalnız sıcaklık düşürülerek açıklanabilir; elektron geçişi yoktur.", correct: false, delta: -7, feedback: "Enerji geçişi gözden kaçtı.", whyWrong: "Buradaki asıl yorum elektronun daha yüksek enerji düzeyine çıkmış olmasıdır." },
      ],
      correctWhy: "Alt düzeyde boşluk bırakıp daha yüksek alt düzeyde elektron görmek, türün uyarılmış hâlde olduğunu düşündürür.",
    },
    {
      id: "excited-state-1",
      title: "Azot Uyarılma Sızıntısı",
      text: "Arşiv, nötr bir azot hattında kısa süreli alışılmadık bir dağılım yakaladı. En mantıklı yorumu seç.",
      evidence: [
        { label: "Kayıt", value: "1s² 2s² 2p² 3s¹" },
        { label: "Tür", value: "N hattı" },
        { label: "Durum", value: "alt düzeyde boşluk kaldı" },
      ],
      options: [
        { text: "Kayıt uyarılmış hâle işaret eder; elektron daha yüksek düzeye taşınmıştır.", correct: true, delta: 13, feedback: "Geçici uyarılma doğru yorumlandı.", whyWrong: "" },
        { text: "Bu düzen temel hâlde en kararlı dizilimdir.", correct: false, delta: -10, feedback: "Kararsız düzen temel hâl sanıldı.", whyWrong: "Daha düşük enerjili 2p tam dolmadan 3s'ye çıkılması temel hâl göstermez." },
        { text: "Bu kayıt, atomun proton sayısının azaldığını gösterir.", correct: false, delta: -9, feedback: "Çekirdek bilgisi elektron düzenine yanlış bağlandı.", whyWrong: "Elektron dağılımı değişirken proton sayısı değişmek zorunda değildir." },
        { text: "Bu durum yalnız iyon oluşumuyla açıklanabilir.", correct: false, delta: -8, feedback: "İyon ve uyarılmış hâl karıştırıldı.", whyWrong: "Elektron aynı toplamla başka düzeye çıkmış olabilir; bu doğrudan iyon demek değildir." },
        { text: "Azot için p orbitali hiç açılamadığı için kayıt tümden geçersizdir.", correct: false, delta: -9, feedback: "Orbital açılımı yanlış hatırlandı.", whyWrong: "Azot için 2p bölmesi açıktır; sorun açılmasında değil, uyarılmış düzende oluşudur." },
      ],
      correctWhy: "Temel hâlde daha düşük enerjili alt düzey dolmadan üst düzeye çıkan elektron, türün uyarılmış hâlde olduğunu gösterir.",
    },
  ].forEach((item) => pool.push(buildChoiceCrisis({ category: "excited-state", ...item })));

  [
    {
      id: "block-period-0",
      title: "Periyot ve Blok Yönlendirmesi",
      text: "Arşiv, üç son kayıt için periyot ve blok etiketini karıştırdı. Her satırı en uygun konumla eşleştir.",
      assignItems: [
        { label: "Kayıt 1", prompt: "Son elektron 3p orbitaline yerleşti.", options: ["3. periyot / p blok", "3. periyot / s blok", "2. periyot / p blok"], answer: "3. periyot / p blok" },
        { label: "Kayıt 2", prompt: "Son terim 4s¹ ile bitiyor.", options: ["4. periyot / s blok", "4. periyot / p blok", "3. periyot / s blok"], answer: "4. periyot / s blok" },
        { label: "Kayıt 3", prompt: "Son terim 4s² 3d⁵ olarak kapanıyor.", options: ["3. periyot / d blok", "4. periyot / d blok", "4. periyot / p blok"], answer: "4. periyot / d blok" },
      ],
      correctWhy: "En büyük ana enerji düzeyi periyodu, son elektronun bulunduğu orbital türü de blok bilgisini verir.",
      failureWhy: "Son terimden periyot ve blok bilgisi doğru okunamadı.",
    },
    {
      id: "block-period-1",
      title: "Konum Arşivi Düzenleme",
      text: "Son elektron kayıtları yanlış raflara düştü. Her satırı doğru periyot ve blok etiketine bağla.",
      assignItems: [
        { label: "Kayıt 1", prompt: "Son elektron 2p bölgesine indi.", options: ["2. periyot / p blok", "2. periyot / s blok", "3. periyot / p blok"], answer: "2. periyot / p blok" },
        { label: "Kayıt 2", prompt: "Son terim 3s² ile bitiyor.", options: ["2. periyot / s blok", "3. periyot / s blok", "3. periyot / p blok"], answer: "3. periyot / s blok" },
        { label: "Kayıt 3", prompt: "Son terim 4p² olarak kapanıyor.", options: ["4. periyot / p blok", "4. periyot / s blok", "5. periyot / p blok"], answer: "4. periyot / p blok" },
      ],
      correctWhy: "Periyot, en yüksek n değerinden; blok ise son orbital türünden çıkarılır.",
      failureWhy: "Konum bilgisi son orbital kaydından doğru türetilemedi.",
    },
  ].forEach((item) =>
    pool.push(
      buildAssignCrisis({
        category: "block-period",
        evidence: [
          { label: "Panel", value: "periyot-blok arşivi" },
          { label: "İstek", value: "her satırı doğru konumla eşleştir" },
        ],
        successText: "Konum kayıtları doğru raflara döndü.",
        successDelta: 14,
        failureText: "Periyot ve blok arşivi yine karışık kaldı.",
        failureDelta: -12,
        bootLog: "Periyot-blok eşleştirme modülü açıldı.",
        ...item,
      })
    )
  );

  [
    {
      id: "isoelectronic-0",
      title: "İzoelektronik Filtre Sırası",
      text: "Aynı elektron sayılı türler tek hatta girdi. Türleri yarıçapça küçükten büyüğe sırala.",
      assignItems: [
        { label: "1. sıra", prompt: "En küçük yarıçap", options: ["O²⁻", "F⁻", "Na⁺", "Mg²⁺"], answer: "Mg²⁺" },
        { label: "2. sıra", prompt: "İkinci en küçük yarıçap", options: ["O²⁻", "F⁻", "Na⁺", "Mg²⁺"], answer: "Na⁺" },
        { label: "3. sıra", prompt: "Üçüncü en küçük yarıçap", options: ["O²⁻", "F⁻", "Na⁺", "Mg²⁺"], answer: "F⁻" },
        { label: "4. sıra", prompt: "En büyük yarıçap", options: ["O²⁻", "F⁻", "Na⁺", "Mg²⁺"], answer: "O²⁻" },
      ],
      evidence: [
        {
          label: "Tablo",
          value: genericTableMarkup(
            ["Tür", "Yük"],
            [
              ["O", "2−"],
              ["F", "1−"],
              ["Na", "1+"],
              ["Mg", "2+"],
            ]
          ),
        },
        { label: "İstek", value: "Türleri küçükten büyüğe sırala." },
      ],
      correctWhy: "İzoelektronik türlerde proton sayısı arttıkça çekim artar ve yarıçap küçülür; bu yüzden sıra Mg²⁺ < Na⁺ < F⁻ < O²⁻ olur.",
      failureWhy: "İzoelektronik türlerde çekirdek yükü ile yarıçap arasındaki ilişki doğru kurulamadı.",
    },
    {
      id: "isoelectronic-1",
      title: "İzoelektronik Yorum Denetimi",
      text: "Aynı elektron sayılı türler için operatör günlüklerinden biri doğru yorumu içeriyor. En mantıklı satırı seç.",
      evidence: [
        { label: "Paket", value: "N³⁻, O²⁻, F⁻, Na⁺" },
        { label: "Ortak veri", value: "tüm türlerde elektron sayısı aynıdır" },
        { label: "İstek", value: "doğru yorumu seç" },
      ],
      options: [
        { text: "Proton sayısı arttıkça yarıçap küçülür; bu yüzden Na⁺, F⁻'den küçüktür.", correct: true, delta: 13, feedback: "İzoelektronik yorum doğru kuruldu.", whyWrong: "" },
        { text: "Elektron sayısı aynıysa bütün yarıçaplar eşit kalır.", correct: false, delta: -10, feedback: "İzoelektronik kavramı fazla genellendi.", whyWrong: "Çekirdek yükü farkı yarıçapı değiştirir." },
        { text: "En negatif yüklü tür her zaman en küçük olur.", correct: false, delta: -9, feedback: "Yük etkisi ters yorumlandı.", whyWrong: "Daha negatif yüklü türler genelde daha büyük yarıçaplıdır." },
        { text: "Bu karşılaştırmada proton sayısı hiçbir şey değiştirmez.", correct: false, delta: -10, feedback: "Temel belirleyici gözden kaçtı.", whyWrong: "İzoelektronik türlerde ana belirleyici çekirdek yüküdür." },
        { text: "Na⁺ en büyüktür çünkü metal kökenlidir.", correct: false, delta: -8, feedback: "Metal/ametal etiketi yanlış yere taşındı.", whyWrong: "Burada tür sınıfından çok proton sayısı ve aynı elektron sayısı ilişkisi önemlidir." },
      ],
      correctWhy: "İzoelektronik türlerde çekirdek yükü arttıkça yarıçap küçülür; aynı elektron sayısında bu yorum belirleyicidir.",
    },
  ].forEach((item) => {
    if (item.assignItems) {
      pool.push(
        buildAssignCrisis({
          category: "isoelectronic",
          evidence: item.evidence,
          successText: "İzoelektronik filtre sırası doğru kuruldu.",
          successDelta: 14,
          failureText: "Filtre sırası yanlış kuruldu.",
          failureDelta: -12,
          bootLog: "İzoelektronik sıralama modülü açıldı.",
          ...item,
        })
      );
      return;
    }

    pool.push(buildChoiceCrisis({ category: "isoelectronic", ...item }));
  });

  [
    {
      id: "valence-group-0",
      title: "Değerlik Davranışı Kaydı",
      text: "Son katman düzeni verilen baş grup türü için en mantıklı davranışı seç.",
      evidence: [
        { label: "Son düzen", value: "ns²np⁵" },
        { label: "Tür", value: "baş grup elementi" },
        { label: "İstek", value: "davranış yorumu" },
      ],
      options: [
        { text: "Bir elektron alma eğilimi yüksektir; çoğu bileşikte -1 görülebilir.", correct: true, delta: 13, feedback: "Değerlik düzeni doğru yorumlandı.", whyWrong: "" },
        { text: "İki elektron verip +2 oluşturma eğilimi baskındır.", correct: false, delta: -10, feedback: "Grup davranışı yanlış okundu.", whyWrong: "ns²np⁵ düzeni bir elektron alarak kararlı yapıya yaklaşır." },
        { text: "Bu tür genelde d blok geçiş metali gibi davranır.", correct: false, delta: -9, feedback: "Blok ve grup kavramı karıştı.", whyWrong: "ns²np⁵ düzeni baş grup p blok davranışına işaret eder." },
        { text: "Elektron alma-verme eğilimi yoktur; her zaman nötr kalır.", correct: false, delta: -8, feedback: "Değerlik elektronu göz ardı edildi.", whyWrong: "Yedi değerlik elektronlu baş grup türleri oldukça belirgin davranış gösterir." },
        { text: "Temel davranış, üç elektron verip +3 oluşturmaktır.", correct: false, delta: -10, feedback: "Oktet eğilimi ters kuruldu.", whyWrong: "Bu tür bir elektron alarak soygaz düzenine yaklaşır." },
      ],
      correctWhy: "ns²np⁵ düzeni yedi değerlik elektronu gösterir; bir elektron alarak oktete ulaşma eğilimi kuvvetlidir.",
    },
    {
      id: "valence-group-1",
      title: "Tek Elektronlu Dış Katman Dosyası",
      text: "Son katman bilgisine göre türün en olası iyon davranışını seç.",
      evidence: [
        { label: "Son düzen", value: "ns¹" },
        { label: "Tür", value: "baş grup elementi" },
        { label: "İstek", value: "iyon davranışı" },
      ],
      options: [
        { text: "Tek elektronu verip +1 katyon oluşturma eğilimi yüksektir.", correct: true, delta: 13, feedback: "Dış katman davranışı doğru çözüldü.", whyWrong: "" },
        { text: "Yedi elektron alıp -7 oluşturma eğilimi baskındır.", correct: false, delta: -11, feedback: "Oktet mantığı bozuldu.", whyWrong: "ns¹ düzenli baş grup türü bir elektron vererek kararlı yapıya yaklaşır." },
        { text: "Genelde elektron alıp -1 anyon olur.", correct: false, delta: -9, feedback: "Alkali davranış ters okundu.", whyWrong: "Tek dış elektronu bulunan baş grup türleri çoğunlukla elektron verir." },
        { text: "Bu düzen kararlı olduğu için iyon oluşturmaz.", correct: false, delta: -8, feedback: "Tek değerlik elektronu kararlı sanıldı.", whyWrong: "ns¹ düzen çoğu zaman kararlı soygaz düzeni değildir." },
        { text: "Bu bilgiyle hiçbir davranış yorumu yapılamaz.", correct: false, delta: -8, feedback: "Değerlik verisi boşa çıkarıldı.", whyWrong: "Son katman düzeni iyon davranışı hakkında güçlü ipucu verir." },
      ],
      correctWhy: "ns¹ düzenli baş grup türleri dıştaki tek elektronu vererek +1 katyon oluşturma eğilimindedir.",
    },
  ].forEach((item) => pool.push(buildChoiceCrisis({ category: "valence-group", ...item })));

  [
    {
      id: "orbital-energy-0",
      title: "Orbital Enerji Kuyruğu",
      text: "Enerji kuyruğuna düşen orbitaller yanlış sıralandı. En yüksekten en düşüğe doğru en uygun diziyi seç.",
      evidence: [
        { label: "Orbital seti", value: "4f, 6s, 5p, 3d, 2s" },
        { label: "İstek", value: "enerji sırasını değerlendir" },
      ],
      options: [
        { text: "4f > 6s > 5p > 3d > 2s", correct: true, delta: 14, feedback: "n+l mantığı doğru kuruldu.", whyWrong: "" },
        { text: "2s > 3d > 4f > 5p > 6s", correct: false, delta: -11, feedback: "Enerji sırası ters çevrildi.", whyWrong: "Düşük n değerli orbitalleri otomatik olarak en yüksek enerjiye koymak doğru değildir." },
        { text: "6s > 5p > 4f > 3d > 2s", correct: false, delta: -10, feedback: "Yakın orbitallerin göreli sırası kaçtı.", whyWrong: "4f ile 6s ve 5p arasındaki sıralama n+l kuralına göre kurulmalıdır." },
        { text: "5p > 4f > 6s > 3d > 2s", correct: false, delta: -10, feedback: "Üst grup sıralaması bozuldu.", whyWrong: "4f, 6s ve 5p arasındaki enerji ilişkisi bu sırada değildir." },
        { text: "4f > 5p > 6s > 3d > 2s", correct: false, delta: -10, feedback: "Orta bant sırası yanlış kaldı.", whyWrong: "6s ile 5p arasındaki enerji ilişkisi yanlış kuruldu." },
      ],
      correctWhy: "Orbital enerji karşılaştırmasında n+l kuralı, eşitlikte ise n değeri küçük olanın daha düşük enerjiye sahip olması kullanılır.",
    },
    {
      id: "orbital-energy-1",
      title: "Yakın Orbital Dizisi",
      text: "Üç orbital için enerji sırası tartışmalı düştü. Düşükten yükseğe en uygun sıralamayı seç.",
      evidence: [
        { label: "Orbitaller", value: "3d, 4s, 4p" },
        { label: "İstek", value: "düşükten yükseğe sırala" },
      ],
      options: [
        { text: "4s < 3d < 4p", correct: true, delta: 13, feedback: "Yakın enerji orbitalleri doğru sıralandı.", whyWrong: "" },
        { text: "3d < 4s < 4p", correct: false, delta: -10, feedback: "4s ve 3d yer değiştirdi.", whyWrong: "Temel yerleşim mantığında 4s, 3d'den önce dolar; bu enerji sırasına işaret eder." },
        { text: "4p < 3d < 4s", correct: false, delta: -10, feedback: "Üst orbital en alta çekildi.", whyWrong: "4p bu üçlü içinde en yüksek enerjiye sahiptir." },
        { text: "3d < 4p < 4s", correct: false, delta: -10, feedback: "Tüm sıra bozuldu.", whyWrong: "4s en düşük, 4p en yüksek tarafta kalmalıdır." },
        { text: "4s < 4p < 3d", correct: false, delta: -9, feedback: "Orta ve üst basamak karıştı.", whyWrong: "3d ile 4p arasındaki enerji ilişkisi yanlış kuruldu." },
      ],
      correctWhy: "Yakın enerji orbitallerde Aufbau mantığı 4s'nin 3d'den, 3d'nin de 4p'den önce geldiğini gösterir.",
    },
  ].forEach((item) => pool.push(buildChoiceCrisis({ category: "orbital-energy", ...item })));

  [
    {
      category: "model-filter",
      id: "model-filter-0",
      title: "Model Filtre Paketi",
      text: "İfadeler karıştı. Modern atom teorisiyle uyumlu olanların tümünü seç.",
      evidence: [
        { label: "Durum", value: "eski ve yeni model dili aynı kayda düştü" },
        { label: "İstek", value: "uyumlu ifadeleri ayıkla" },
      ],
      multiPrompt: "Modern atom teorisiyle uyumlu olan tüm ifadeleri seç.",
      multiItems: [
        { text: "Elektronlar bulunma olasılığının yüksek olduğu bölgelerle düşünülür.", correct: true },
        { text: "Elektronun yeri ve hızı aynı anda tam kesinlikle belirlenebilir.", correct: false },
        { text: "Orbital, dairesel bir yörünge çizgisi değildir.", correct: true },
        { text: "Çok elektronlu atomlar Bohr modeliyle eksiksiz açıklanır.", correct: false },
        { text: "Elektronlar sabit tek rota üzerinde döner kabul edilir.", correct: false },
      ],
      successText: "Uygun ifadeler doğru ayıklandı.",
      successDelta: 13,
      failureText: "Eski model ve modern model cümleleri karıştı.",
      failureDelta: -10,
      failureWhy: "Modern atom teorisini destekleyen ifadeler ile eski model dili birlikte değerlendirilemedi.",
      correctWhy: "Modern atom teorisi, elektronu sabit yörünge değil orbital ve olasılık yaklaşımıyla yorumlar.",
      bootLog: "Model filtre paneli açıldı.",
    },
  ].forEach((item) => pool.push(buildMultiCrisis(item)));

  [
    {
      category: "radius-compare",
      id: "radius-compare-0",
      title: "Yarıçap Karşılaştırma Panosu",
      text: "Her satır için soldaki tür ile sağdaki tür arasındaki yarıçap ilişkisini seç.",
      evidence: [
        { label: "Not", value: "aynı periyot ve izoelektronik mantığı birlikte kullanılacak" },
        { label: "İstek", value: "her satır için <, > ya da = seç" },
      ],
      comparePrompt: "Soldaki türün yarıçapını sağdaki türe göre karşılaştır.",
      compareItems: [
        { label: "Satır 1", left: "Na", right: "Mg", answer: ">" },
        { label: "Satır 2", left: "O²⁻", right: "F⁻", answer: ">" },
        { label: "Satır 3", left: "Na⁺", right: "F⁻", answer: "<" },
      ],
      successText: "Yarıçap ilişkileri doğru kuruldu.",
      successDelta: 14,
      failureText: "En az bir yarıçap karşılaştırması ters kuruldu.",
      failureDelta: -11,
      failureWhy: "Periyot eğilimi ve izoelektronik tür mantığı aynı tabloda birlikte okunamadı.",
      correctWhy: "Aynı periyotta proton sayısı arttıkça yarıçap küçülür; izoelektronik türlerde de çekirdek yükü arttıkça yarıçap azalır.",
      bootLog: "Karşılaştırma panosu açıldı.",
    },
  ].forEach((item) => pool.push(buildCompareCrisis(item)));

  [
    {
      category: "oxidation-step",
      id: "oxidation-step-0",
      title: "Yükseltgenme Ayar Modülü",
      text: "Aşağıdaki bileşiklerde verilen elementlerin yükseltgenme basamağını doğru değere getir.",
      evidence: [
        { label: "Kayıt", value: "yük dengesi kullanılacak" },
        { label: "İstek", value: "değerleri doğru basamağa ayarla" },
      ],
      stepperPrompt: "Her satır için doğru yükseltgenme basamağını seç.",
      stepperItems: [
        { label: "Mn", formula: "KMnO₄", min: -1, max: 7, start: 0, answer: 7 },
        { label: "Cr", formula: "K₂Cr₂O₇", min: -1, max: 7, start: 0, answer: 6 },
        { label: "Cl", formula: "HClO₄", min: -1, max: 7, start: 0, answer: 7 },
      ],
      successText: "Yükseltgenme basamakları doğru ayarlandı.",
      successDelta: 14,
      failureText: "En az bir yükseltgenme basamağı yanlış ayarlandı.",
      failureDelta: -11,
      failureWhy: "Bileşiklerde toplam yükseltgenme basamağı dengesi doğru kurulamadı.",
      correctWhy: "Oksijen çoğu zaman -2, hidrojen +1 alınır; toplam yükten merkez atomun değeri bulunur.",
      bootLog: "Yükseltgenme ayar modülü açıldı.",
    },
  ].forEach((item) => pool.push(buildStepperCrisis(item)));

  [
    {
      category: "row-pick",
      id: "row-pick-0",
      title: "Tablo Satırı Denetimi",
      text: "Tablodaki yorumlardan biri fiziksel olarak tutarsız. Tutarsız olan satırı seç.",
      evidence: [
        {
          label: "Tablo",
          value: genericTableMarkup(
            ["Satır", "Tür", "Yorum"],
            [
              ["A", "Na⁺", "nötr Na atomundan küçüktür"],
              ["B", "Cl⁻", "nötr Cl atomundan büyüktür"],
              ["C", "Mg²⁺", "proton sayısı 2 azalır"],
              ["D", "O²⁻", "elektron sayısı artar"],
            ]
          ),
        },
        { label: "İstek", value: "tutarsız satırı seç" },
      ],
      tablePickHeaders: ["Satır", "Tür", "Yorum"],
      tablePickRows: [
        ["A", "Na⁺", "nötr Na atomundan küçüktür"],
        ["B", "Cl⁻", "nötr Cl atomundan büyüktür"],
        ["C", "Mg²⁺", "proton sayısı 2 azalır"],
        ["D", "O²⁻", "elektron sayısı artar"],
      ],
      tablePickAnswer: 2,
      tablePickPrompt: "Tutarsız olan satırı seç.",
      successText: "Tutarsız satır doğru bulundu.",
      successDelta: 13,
      failureText: "Tablodaki asıl çelişki kaçtı.",
      failureDelta: -10,
      failureWhy: "İyon oluşurken proton sayısının değişmediği bilgisi gözden kaçtı.",
      correctWhy: "İyon oluşurken proton sayısı değişmez; yalnız elektron sayısı artar ya da azalır.",
      bootLog: "Tablo satırı denetimi açıldı.",
    },
  ].forEach((item) => pool.push(buildTablePickCrisis(item)));

  [
    {
      category: "quantum-matrix",
      id: "quantum-matrix-0",
      title: "Kuantum Etiketi Matrisi",
      text: "Her satırı doğru orbital ailesiyle eşleştir.",
      evidence: [
        { label: "Veri", value: "yalnız l değeri kullanılacak" },
        { label: "İstek", value: "satırları doğru sütunla eşleştir" },
      ],
      matrixPrompt: "Her l değerini doğru orbital ailesine bağla.",
      matrixRows: ["l = 0", "l = 1", "l = 2", "l = 3"],
      matrixCols: ["s", "p", "d", "f"],
      matrixAnswers: ["s", "p", "d", "f"],
      successText: "Kuantum etiketleri doğru eşleştirildi.",
      successDelta: 13,
      failureText: "En az bir kuantum etiketi yanlış aileye bağlandı.",
      failureDelta: -10,
      failureWhy: "l değeri ile orbital ailesi arasındaki temel eşleşme karıştırıldı.",
      correctWhy: "l = 0 s, 1 p, 2 d, 3 f ailesini verir.",
      bootLog: "Kuantum matrisi açıldı.",
    },
  ].forEach((item) => pool.push(buildMatrixCrisis(item)));

  [
    {
      atom: "O",
      title: "Oksijen Kutu Denetimi",
      text: "Panel üç ayrı satır öneriyor. Her satırı doğru ya da yanlış olarak işaretle.",
      classifyItems: [
        { text: "Aynı orbital kutusunda iki elektron zıt spinle tutuluyor." },
        { text: "2p kutularından biri dolmadan aynı tür başka kutuda eşleşme başlatılıyor." },
        { text: "n = 2 için p bölmesi açılabiliyor." },
      ],
      classifyTarget: ["doğru", "yanlış", "doğru"],
      evidence: [
        { label: "Tür", value: "O" },
        { label: "Panel", value: "kutu davranışı denetimi" },
        { label: "İstek", value: "satırları filtrele" },
      ],
      relatedSymbols: ["O"],
      deepIntel: { label: "Derin tanı", value: "Sorun tek satırda değil; kural bazlı eleme gerekiyor." },
      successText: "Sorunlu satırlar doğru filtrelendi.",
      successDelta: 13,
      failureText: "Uygun ve uygunsuz davranışlar birbirine karıştı.",
      failureDelta: -11,
      failureWhy: "Pauli, Hund ve temel orbital izinleri aynı listede karıştırıldı; işaretleme yanlış yapıldı.",
      bootLog: "Kural denetim paneli açıldı.",
    },
    {
      atom: "Na",
      title: "Sodyum Operatör Günlüğü Tarama",
      text: "Bakım günlüğüne düşen üç kısa not var. Her satırı doğru ya da yanlış olarak ayır.",
      classifyItems: [
        { text: "Na nötr halde 11 elektrona sahiptir." },
        { text: "Na+ oluştuğunda proton sayısı da 1 azalır." },
        { text: "İyon oluşurken proton sayısı sabit kalabilir, elektron sayısı değişebilir." },
      ],
      classifyTarget: ["doğru", "yanlış", "doğru"],
      evidence: [
        { label: "Tür", value: "Na" },
        { label: "Panel", value: "operatör günlüğü" },
        { label: "İstek", value: "not doğrulama" },
      ],
      relatedSymbols: ["Na"],
      deepIntel: { label: "Derin tanı", value: "İyon yorumlarında en sık hata proton sayısını da değişmiş sanmaktır." },
      successText: "Günlükteki hatalı satırlar ayıklandı.",
      successDelta: 12,
      failureText: "Hatalı saha notları sisteme doğruymuş gibi işlendi.",
      failureDelta: -10,
      failureWhy: "İyon kavramı ile atom çekirdeği kavramı birbirine karıştırıldı.",
      bootLog: "Günlük doğrulama paneli açıldı.",
    },
    {
      atom: "P",
      title: "Fosfor Kuantum Satırı Elemesi",
      text: "Denetim sistemi üç kart açıklaması verdi. Her satırı doğru ya da yanlış olarak işaretle.",
      classifyItems: [
        { text: "n = 3 için l = 1 değeri mümkündür." },
        { text: "n = 1 için p orbitali açılabilir." },
        { text: "Eş enerjili p kutuları önce tekli dolma eğilimi gösterir." },
      ],
      classifyTarget: ["doğru", "yanlış", "doğru"],
      evidence: [
        { label: "Tür", value: "P" },
        { label: "Panel", value: "kuantum satır taraması" },
        { label: "İstek", value: "satır eleme" },
      ],
      relatedSymbols: ["P"],
      deepIntel: { label: "Derin tanı", value: "Bir satır kuantum sayısı, biri orbital türü, biri Hund davranışı içeriyor." },
      successText: "Kurala aykırı satırlar başarıyla ayrıldı.",
      successDelta: 13,
      failureText: "Kart açıklamaları yanlış sınıflandırıldı.",
      failureDelta: -11,
      failureWhy: "Kuantum sayısı izinleri ile orbital dolma davranışları birlikte düşünülmedi.",
      bootLog: "Satır işaretleme paneli açıldı.",
    },
  ].forEach((item, index) => {
    pool.push(
      buildClassifyCrisis({
        category: "audit-grid",
        id: `audit-grid-${index}`,
        ...item,
      })
    );
  });

  [
    {
      atom: "N",
      region: "2p",
      boxTarget: [1, 1, 1],
    },
    {
      atom: "O",
      region: "2p",
      boxTarget: [2, 1, 1],
    },
    {
      atom: "P",
      region: "3p",
      boxTarget: [1, 1, 1],
    },
    {
      atom: "Cl",
      region: "3p",
      boxTarget: [2, 2, 1],
    },
  ].forEach((item, index) => {
    pool.push(
      buildBoxCrisis({
        category: "orbital-box",
        id: `orbital-box-${index}`,
        title: `${item.atom} Orbital Kutu Yerleşimi`,
        text: `${item.region} bölgesine gelen elektronları kutulara fiziksel olarak doğru biçimde yerleştir.`,
        evidence: [
          { label: "Tür", value: item.atom },
          { label: "Bölge", value: item.region },
        ],
        relatedSymbols: [item.atom],
        deepIntel: { label: "Derin tanı", value: "Önce tek tek dağıt, ancak zorunluysa eşleştir." },
        boxTarget: item.boxTarget,
        boxLabels: [`${item.region}-1`, `${item.region}-2`, `${item.region}-3`],
        boxPrompt: `${item.region} kutularının her biri için ∅, ↑ ya da ↑↓ seç.`,
        successText: "Orbital kutuları doğru dolduruldu.",
        successDelta: 13,
        failureText: "Kutuların dolumu fiziksel kurallara uymadı.",
        failureDelta: -12,
        failureWhy: "Pauli veya Hund ilkesi ihlal edildi; kutuların yerleşimi yanlış kuruldu.",
        correctWhy: "Eş enerjili kutular önce tek tek dolar; aynı kutuda çift yapılacaksa zıt spinle eşleşme ancak sonra gelir.",
        bootLog: "Orbital kutu modülü açıldı.",
      })
    );
  });

  [
    {
      category: "stable-check",
      id: "stable-0",
      title: "Neon Hattı Rutin Paket İncelemesi",
      text: "Panel kısa süreli alarm rengi aldı. Gelen veri paketini değerlendir.",
      evidence: [
        { label: "Tür", value: "Ne" },
        { label: "Gözlem", value: "tekrarlı pik yok" },
        { label: "Kayıt", value: "kanal akışı simetrik" },
      ],
      relatedSymbols: ["Ne"],
      options: [
        { text: "Sorun yok, yalnızca izlemeye devam et.", correct: true, delta: 8, feedback: "Durum doğru okundu. Gereksiz müdahaleden kaçınıldı.", whyWrong: "" },
        { text: "Elektron koparma gücünü birden artır.", correct: false, delta: -10, feedback: "Stabil hatta gereksiz baskı uygulandı.", whyWrong: "Gerçek arıza yokken agresif müdahale gereksiz hasar yarattı." },
        { text: "Kapı çaplarını rastgele daralt.", correct: false, delta: -8, feedback: "Geometri rastgele değiştirildi.", whyWrong: "Kararlı hatta kör geometri değişikliği yapmak gereksiz bozulma üretir." },
        { text: "Acil boşaltım başlat.", correct: false, delta: -11, feedback: "Normal durum kriz gibi ele alındı.", whyWrong: "Her alarm rengi gerçek arıza değildir; boşaltım aşırı tepkidir." },
        { text: "Kuantum kartını reddet.", correct: false, delta: -7, feedback: "Ortada reddedilecek bir kart yoktu.", whyWrong: "Sorun olmayan pakette alakasız protokol uygulandı." },
      ],
    },
    {
      category: "stable-check",
      id: "stable-1",
      title: "Sodyum Hattı Görsel Sapma Kaydı",
      text: "Kısa bir görsel sıçrama kayda geçti. Müdahale gerekip gerekmediğini değerlendir.",
      evidence: [
        { label: "Tür", value: "Na" },
        { label: "Gözlem", value: "tek atımlık görsel sıçrama" },
        { label: "Kayıt", value: "yük kanalı sabit" },
      ],
      relatedSymbols: ["Na"],
      options: [
        { text: "Durumu normal kabul edip izlemeyi sürdür.", correct: true, delta: 8, feedback: "Gereksiz kriz protokolü tetiklenmedi.", whyWrong: "" },
        { text: "Son elektronu hemen başka bir orbitale taşı.", correct: false, delta: -9, feedback: "Kararlı hatta gereksiz dizilim değişikliği yapıldı.", whyWrong: "Belirti gerçek dizilim arızası göstermiyordu." },
        { text: "Tüm hattı yeniden soğut.", correct: false, delta: -7, feedback: "Soğutma gereksiz kullanıldı.", whyWrong: "Kararlı hatta kaynak harcamak yeni risk doğurur." },
        { text: "İyon kapısını daralt.", correct: false, delta: -8, feedback: "İlgisiz geometri müdahalesi yapıldı.", whyWrong: "Burada iyon geometri sorunu yoktu." },
        { text: "Koparma eşiğini maksimuma çek.", correct: false, delta: -10, feedback: "Güç haritası gereksizce sertleştirildi.", whyWrong: "Elektron koparma gücüyle ilgili bir anormallik yoktu." },
      ],
    },
    {
      category: "stable-check",
      id: "stable-2",
      title: "Kalsiyum Penceresi Değerlendirme İsteği",
      text: "Sistem senden doğrudan müdahale değil, önce durum değerlendirmesi istiyor.",
      evidence: [
        { label: "Tür", value: "Ca" },
        { label: "Gözlem", value: "simetrik dalga izi" },
        { label: "Kayıt", value: "kutular arası yük paylaşımı düzenli" },
      ],
      relatedSymbols: ["Ca"],
      options: [
        { text: "Sorun yok de ve sistemi gözlem modunda bırak.", correct: true, delta: 9, feedback: "Sakin durumda sakin karar verildi.", whyWrong: "" },
        { text: "Eş enerjili kutuları yeniden dağıt.", correct: false, delta: -8, feedback: "Düzenli kutu dağılımı gereksizce bozuldu.", whyWrong: "Hund müdahalesi gerektiren bir belirti yoktu." },
        { text: "Kartı terminalden reddet.", correct: false, delta: -7, feedback: "Kart krizi olmadan reddetme protokolü açıldı.", whyWrong: "Kuantum kartı problemi olmayan durumda alakasız komut uygulandı." },
        { text: "Acil sigorta boşaltması başlat.", correct: false, delta: -11, feedback: "Gereksiz panik protokolü tetiklendi.", whyWrong: "Durum sakin olduğu halde kriz protokolü başlatıldı." },
        { text: "İki üst kanalı kapat.", correct: false, delta: -10, feedback: "Kararlı akış kör biçimde bozuldu.", whyWrong: "Kararlı hatta üst kanalları kapatmak durumu iyileştirmez, bozar." },
      ],
    },
  ].forEach((item) => pool.push(buildChoiceCrisis(item)));

  return pool;
}

function buildRun() {
  const preset = currentDifficulty();
  state.runId = randomId();
  const pool = crisisTemplates();
  const selected = pickDistinctCategories(pool, preset.crisisCount);
  ensureCategory(selected, pool, "exception-match");
  decorateRunCrises(selected);
  decorateTimedCrisis(selected);
  decorateLockEvents(selected);
  state.crises = [...selected, finalProtocolCrisis()];
}

function buildTutorialRun() {
  state.runId = `tutorial-${randomId()}`;

  const tutorialCrises = [
    buildChoiceCrisis({
      category: "model-shift",
      id: "tutorial-read-choice",
      title: "Eğitim Paketi // İlk Karar",
      text: "İlk eğitim adımında sadece kriz metnini ve canlı veri kartlarını okuyup en mantıklı yorumu seçeceksin.",
      evidence: [
        { label: "Kayıt", value: "elektron tek bir dairesel yol üstünde izlenmeye çalışılıyor" },
        { label: "Belirti", value: "olasılık bölgesi yerine sabit rota üretiliyor" },
        { label: "İstek", value: "yaklaşımı yorumla" },
      ],
      options: [
        { text: "Bu kayıt eski model mantığında kaldı; orbital yaklaşımına geçilmeli.", correct: true, delta: 8, feedback: "Doğru yorum seçildi.", whyWrong: "" },
        { text: "Sistem doğru çalışıyor; elektronun yeri tam olarak belirlenebilir.", correct: false, delta: -2, feedback: "Bu yorum modern yaklaşımla uyuşmuyor.", whyWrong: "Modern atom teorisi elektronu sabit dairesel yol mantığıyla yorumlamaz." },
        { text: "Sorun modelde değil, sadece sıcaklık kayıtlarında.", correct: false, delta: -2, feedback: "Sorun ısı değil, model diliyle ilgiliydi.", whyWrong: "Veri doğrudan eski model dilinin kullanıldığını gösteriyordu." },
      ],
      correctWhy: "Modern atom teorisinde elektron sabit bir çizgide değil, bulunma olasılığının yüksek olduğu orbital bölgeleriyle düşünülür.",
    }),
    buildChoiceCrisis({
      category: "manual-route",
      id: "tutorial-scan-choice",
      title: "Eğitim Paketi // Tarama Sonrası Karar",
      text: "Bu eğitim adımında önce veri toplayıp sonra son elektrona dair doğru yorumu seçeceksin.",
      evidence: [
        { label: "Tür", value: "Na" },
        { label: "Kayıt", value: "son elektron bölgesi doğrulanamadı" },
        { label: "İstek", value: "önce tara, sonra doğru yorumu seç" },
      ],
      relatedSymbols: ["Na"],
      scanRequired: true,
      options: [
        { text: "Na atomunun son elektronu 3s bölgesine yerleşir.", correct: true, delta: 8, feedback: "Tarama sonrası doğru yorum seçildi.", whyWrong: "" },
        { text: "Na atomunun son elektronu 2p bölgesinde kalır.", correct: false, delta: -2, feedback: "Tarama verisi son katmanı desteklemiyordu.", whyWrong: "Na temel hâlde 3s¹ ile sonlanır; 2p dolu iç katmandır." },
        { text: "Na atomunun son elektronu doğrudan 3p bölgesine yerleşir.", correct: false, delta: -2, feedback: "Yerleşim sırası atlandı.", whyWrong: "3p bölgesine geçmeden önce 3s bölgesi dolar." },
      ],
      correctWhy: "Na temel hâlde 3s¹ ile sonlanır; tarama, dış katman yorumunu desteklemek için vardır.",
    }),
    buildChoiceCrisis({
      category: "tutorial-flow",
      id: "tutorial-heat-choice",
      title: "Eğitim Paketi // Denge Kararı",
      text: "Bu eğitim adımında amaç, sıcaklık ve stabilite baskısı büyümeden ilk doğru güvenlik adımını seçmek.",
      evidence: [
        { label: "Sıcaklık", value: "güvenli bandın üstüne çıktı" },
        { label: "Stabilite", value: "yanlış kararlar ve aşırı ısıda düşer" },
        { label: "İstek", value: "önce en doğru güvenlik adımını seç" },
      ],
      options: [
        { text: "Önce Soğutma Kontrolü ile sıcaklığı düşürür, sonra krize dönerim.", correct: true, delta: 8, feedback: "Denge kararı doğru kuruldu.", whyWrong: "" },
        { text: "Önce tarama açarım; sıcaklık sonra çözülür.", correct: false, delta: -2, feedback: "Sistem baskısı yanlış sırayla ele alındı.", whyWrong: "Sıcaklık yükselirse başka sistemler de kapanabilir; önce çekirdeği rahatlatmak daha güvenlidir." },
        { text: "Şimdilik hiçbir şey yapmam; biraz daha veri biriksin.", correct: false, delta: -2, feedback: "Beklemek baskıyı azaltmaz.", whyWrong: "Yükselen sıcaklık ve düşen stabilite gecikmeyi değil, erken müdahaleyi gerektirir." },
      ],
      correctWhy: "Sıcaklık yükselip sistemi zorlamaya başladığında ilk güvenli adım, çekirdeği soğutup baskıyı azaltmaktır.",
    }),
  ];

  tutorialCrises.forEach((crisis) => applySeverityToCrisis(crisis, "düşük"));
  const tutorialCritical = tutorialCrises.find((crisis) => crisis.id === "tutorial-heat-choice");
  if (tutorialCritical) {
    applySeverityToCrisis(tutorialCritical, "kritik");
  }
  state.crises = tutorialCrises;
}

function resetInteractionAreas(crisis) {
  state.attempts = 0;
  state.crisisResolved = false;
  state.interactionBaseLabel = "";
  state.sequence.selected = [];
  state.classify = [];
  state.threatLevel = "";
  state.boxState = [];
  state.boxReview = [];
  state.assignSelections = [];
  state.assignReview = [];
  state.multiSelections = [];
  state.compareSelections = [];
  state.stepperValues = [];
  state.tablePickSelection = -1;
  state.matrixSelections = [];
  state.lockEvent = null;
  setOverlay(els.lockOverlay, false);
  hideVerdict();
  hideTaskNotice();
  els.actionArea.innerHTML = "";
  els.commandInput.value = "";
  els.ignoreButton.disabled = crisis.id === "core-sync-final" || crisis.severity === "kritik";
  els.ignoreButton.classList.toggle(
    "hidden",
    state.tutorialMode || crisis.id === "core-sync-final" || crisis.severity === "kritik"
  );
  renderThreatArea();
  renderBoxArea();
  renderAssignArea();
  renderMultiArea();
  renderCompareArea();
  renderStepperArea();
  renderTablePickArea();
  renderMatrixArea();

  if (state.terminalLines.length > 0) {
    logLine(`--- Paket ${state.currentIndex + 1} // ${crisis.title} ---`, "dim");
  }

  if (crisis.mode === "command") {
    state.interactionBaseLabel = "terminal müdahalesi gerekli";
    updateInteractionType();
    els.commandArea.classList.remove("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    logLine(crisis.bootLog, "system");
    logLine("Komut fiillerini hatırlamıyorsan YARDIM kullan.", "dim");
  } else if (crisis.mode === "sequence") {
    state.interactionBaseLabel = crisis.id === "core-sync-final" ? "kapanış paneli açık" : "dizilim modülü açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.remove("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    renderSequenceArea();
    logLine(crisis.bootLog, "system");
    logLine(
      crisis.id === "core-sync-final"
        ? "Konu zincirini doğru sırayla kapat."
        : "Parça bankasından doğru sırayı kur.",
      "dim"
    );
  } else if (crisis.mode === "classify") {
    state.interactionBaseLabel = "işaretleme paneli açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.remove("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetClassifyArea();
    logLine(crisis.bootLog, "system");
    logLine("Her satırı doğru ya da yanlış olarak işaretle.", "dim");
  } else if (crisis.mode === "threat") {
    state.interactionBaseLabel = "tehdit kolu açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.remove("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    state.threatLevel = "";
    renderThreatArea();
    logLine(crisis.bootLog, "system");
    logLine("Durumu stabil, izle, müdahale et ya da kritik olarak etiketle.", "dim");
  } else if (crisis.mode === "box") {
    state.interactionBaseLabel = "orbital kutu modülü açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.remove("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetBoxArea();
    logLine(crisis.bootLog, "system");
    logLine("Her kutu için ∅, ↑ ya da ↑↓ durumunu seç.", "dim");
  } else if (crisis.mode === "assign") {
    state.interactionBaseLabel = "eşleştirme modülü açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.remove("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetAssignArea();
    logLine(crisis.bootLog, "system");
    logLine("Her satırı doğru kayıtla eşleştir.", "dim");
  } else if (crisis.mode === "multi") {
    state.interactionBaseLabel = "çoklu seçim paneli açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.remove("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetMultiArea();
    logLine(crisis.bootLog, "system");
    logLine("Doğru olan tüm kartları işaretle.", "dim");
  } else if (crisis.mode === "compare") {
    state.interactionBaseLabel = "karşılaştırma panosu açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.remove("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetCompareArea();
    logLine(crisis.bootLog, "system");
    logLine("Her satır için doğru ilişkiyi seç.", "dim");
  } else if (crisis.mode === "stepper") {
    state.interactionBaseLabel = "değer ayar paneli açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.remove("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    resetStepperArea();
    logLine(crisis.bootLog, "system");
    logLine("Değerleri doğru seviyeye getir.", "dim");
  } else if (crisis.mode === "tablepick") {
    state.interactionBaseLabel = "tablo seçimi açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.remove("hidden");
    els.matrixArea.classList.add("hidden");
    state.tablePickSelection = -1;
    renderTablePickArea();
    logLine(crisis.bootLog, "system");
    logLine("Tablodaki doğru satırı seç.", "dim");
  } else if (crisis.mode === "matrix") {
    state.interactionBaseLabel = "eşleme matrisi açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.add("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.remove("hidden");
    resetMatrixArea();
    logLine(crisis.bootLog, "system");
    logLine("Her satırı doğru sütunla eşleştir.", "dim");
  } else {
    state.interactionBaseLabel = "karar kartları açık";
    updateInteractionType();
    els.commandArea.classList.add("hidden");
    els.actionArea.classList.remove("hidden");
    els.sequenceArea.classList.add("hidden");
    els.classifyArea.classList.add("hidden");
    els.threatArea.classList.add("hidden");
    els.boxArea.classList.add("hidden");
    els.assignArea.classList.add("hidden");
    els.multiArea.classList.add("hidden");
    els.compareArea.classList.add("hidden");
    els.stepperArea.classList.add("hidden");
    els.tablePickArea.classList.add("hidden");
    els.matrixArea.classList.add("hidden");
    els.actionArea.innerHTML = crisis.options
      .map(
        (option, index) => `
          <button class="action-card" data-index="${index}">
            <strong>Seçenek ${String.fromCharCode(65 + index)}</strong>
            ${option.text}
          </button>
        `
      )
      .join("");
    logLine(`${crisis.title} yüklendi. Karar kartları açıldı.`, "system");
  }
}

function nextCrisis() {
  state.currentIndex += 1;
  if (state.currentIndex >= state.crises.length) {
    queueEndGame(
      true,
      state.tutorialMode
        ? "Eğitim tamamlandı. Temel ekran, tarama ve denge akışı başarıyla görüldü."
        : "Çalışma tamamlandı. Reaktör turu ve kapanış zinciri ayakta kaldı."
    );
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  state.currentCrisis = state.crises[state.currentIndex];
  state.currentCrisis.extraEvidence = [];
  state.currentCrisis.scanned = [];
  state.currentCrisis.deepIntelUsed = false;
  if (state.currentCrisis.timedChallenge) {
    state.currentCrisis.timedChallenge.remaining = state.currentCrisis.timedChallenge.limit;
    state.currentCrisis.timedChallenge.resolved = false;
    state.currentCrisis.timedChallenge.expired = false;
    state.timedCueSecond = null;
  } else {
    state.timedCueSecond = null;
  }

  els.crisisTitle.textContent = state.currentCrisis.title;
  els.crisisText.textContent = state.currentCrisis.text;
  renderEvidence(currentEvidence());
  resetInteractionAreas(state.currentCrisis);
  playSfx("crisis-start");
  if (state.currentCrisis.severity === "kritik") {
    changeHeat(6, { quietVisual: true, skipHud: true });
  } else if (state.currentCrisis.severity === "yüksek") {
    changeHeat(3, { quietVisual: true, skipHud: true });
  }
  if (state.currentCrisis.severity === "kritik") {
    playSfx("critical");
    flashDamage();
    pulseGlitch();
    logLine("Kritik alarm açıldı. Darbe eşiği yükseldi.", "alert");
  } else if (state.currentCrisis.severity === "yüksek") {
    pulseGlitch();
    logLine("Yüksek alarm açıldı. Karar cezası sertleşti.", "alert");
  }
  if (state.currentCrisis.timedChallenge) {
    playSfx("warning");
    logLine(
      `Süreli paket açıldı. Müdahale penceresi ${state.currentCrisis.timedChallenge.remaining} sn.`,
      "alert"
    );
  }
  armLockEvent(state.currentCrisis);
  syncTaskNotice();
  updateHud();
  renderDevPanel();

  document.querySelectorAll(".action-card").forEach((button) => {
    button.addEventListener("click", () => resolveChoice(Number(button.dataset.index)));
  });

  if (state.tutorialMode) {
    startTutorialGuideForCurrentCrisis();
  } else {
    hideTutorialGuide();
  }
}

function tick() {
  if (!state.active) {
    return;
  }
  if (state.freezeTicks > 0) {
    state.freezeTicks -= 1;
    if (state.freezeTicks === 0) {
      logLine("Alan sabitleme bitti. Zaman akışı normale döndü.", "dim");
    }
    updateHud();
    return;
  }
  if (state.tutorialMode) {
    updateHud();
    return;
  }
  state.timeLeft -= 1;
  state.stabilityDrainTick += 1;
  state.heatRiseTick += 1;
  const timed = currentTimedChallenge();
  if (timed && !timed.resolved) {
    timed.remaining = Math.max(0, (timed.remaining ?? timed.limit) - 1);
    if (timed.remaining <= 6 && state.timedCueSecond !== timed.remaining) {
      state.timedCueSecond = timed.remaining;
      playSfx(timed.remaining <= 3 ? "critical" : "warning");
      if (timed.remaining <= 3) {
        logLine(`Süreli paket daralıyor. ${timed.remaining} sn kaldı.`, "alert");
      }
    }
    if (timed.remaining <= 0) {
      updateInteractionType();
      syncTaskNotice();
      expireTimedCrisis();
      return;
    }
  } else {
    state.timedCueSecond = null;
  }
  if (!state.noiseEvent) {
    state.noiseCountdown -= noisePressureForHeat();
  }
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    endGame(false, "Süre bitti. Kontrol penceresi kapandı.");
    return;
  }
  if (state.timeLeft % 16 === 0) {
    logLine(pick(ambientMessages), "dim");
  }
  if (
    !state.noiseEvent &&
    state.noiseCountdown <= 0 &&
    !state.lockEvent &&
    !state.scanBusy &&
    !els.scannerOverlay.classList.contains("visible") &&
    !els.notesOverlay.classList.contains("visible") &&
    !els.coolingOverlay.classList.contains("visible")
  ) {
    triggerNoiseEvent();
  }
  if (state.heatRiseTick >= currentDifficulty().heatRiseEvery) {
    state.heatRiseTick = 0;
    changeHeat(currentDifficulty().heatRiseAmount ?? 1, { quietVisual: true, skipHud: true });
  }
  if (state.timeLeft <= 36) {
    const cadence = state.timeLeft <= 14 ? 4 : 8;
    if (state.timeLeft % cadence === 0 && state.warningCueSecond !== state.timeLeft) {
      state.warningCueSecond = state.timeLeft;
      playSfx("warning");
      if (state.timeLeft <= 14) {
        logLine("Zaman penceresi daralıyor. Terminal kararı gecikmemeli.", "alert");
      }
    }
  } else {
    state.warningCueSecond = null;
  }
  if (state.stabilityDrainTick >= currentDifficulty().stabilityDrainEvery) {
    state.stabilityDrainTick = 0;
    state.stability = Math.max(0, state.stability - 1);
  }
  if (state.heat >= 88 && state.timeLeft % 5 === 0) {
    logLine("Aşırı ısı gövde stabilitesini eritiyor. Soğutma kontrolüne dön.", "alert");
    applyPenalty(-(currentDifficulty().criticalPenalty ?? 2), true, { skipHeat: true });
  } else if (state.heat >= 70 && state.timeLeft % 9 === 0) {
    logLine("Yükselen ısı iç kaplamayı zorluyor.", "alert");
    applyPenalty(-(currentDifficulty().warmPenalty ?? 1), true, { skipHeat: true });
  }
  if (state.stability <= 40) {
    const cadence = state.currentCrisis?.severity === "kritik" ? 3 : 6;
    if (state.timeLeft % cadence === 0 && state.heartbeatCueSecond !== state.timeLeft) {
      state.heartbeatCueSecond = state.timeLeft;
      playSfx("heartbeat");
    }
  } else {
    state.heartbeatCueSecond = null;
  }
  if (state.stability <= 0) {
    endGame(false, "Kararlılık sıfırlandı. Gövde zincirleme bozuldu.");
    return;
  }
  updateInteractionType();
  syncTaskNotice();
  updateHud();
}

function renderOutcomeDetails() {
  const outcome = els.outcomePanel.dataset.outcome || "fail";
  const summaryText = String(els.outcomeText.textContent || "");
  const statsItem = buildOutcomeStatsMarkup();
  let extraItem = "";

  if (outcome === "perfect") {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Operatör Bordrosu</strong>
        <p><em>Maaş Çeki:</em> Tam ödeme onaylandı.</p>
        <ul>
          <li>Performans primi: +1 çekirdek kahvesi</li>
          <li>Kesinti: yok</li>
          <li>Merkez notu: “Bu operatör alarmı paniklemedi.”</li>
        </ul>
      </article>
    `;
  } else if (outcome === "salvaged") {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Operatör Bordrosu</strong>
        <p><em>Maaş Çeki:</em> Ödeme geçti, fazla mesai hâlâ tartışmalı.</p>
        <ul>
          <li>Kesinti: “gereksiz birkaç düğme darbesi” kalemi açık bırakıldı</li>
          <li>Merkez notu: “Kurtardı ama duvara sürttü.”</li>
          <li>Ek açıklama: hasar formu sabaha kadar doldurulacak</li>
        </ul>
      </article>
    `;
  } else if (outcome === "damaged") {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Operatör Bordrosu</strong>
        <p><em>Maaş Çeki:</em> Kesintili ödeme.</p>
        <ul>
          <li>Kesinti nedeni: panel, sigorta ve operatör gururu</li>
          <li>Merkez notu: “Reaktör çıktı, ama muhasebe çıkmadı.”</li>
          <li>İdari takip: ekipman amortisman formu açıldı</li>
        </ul>
      </article>
    `;
  } else if (/ısı|gövde|dağıldı/i.test(summaryText)) {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Merkez Bildirimi</strong>
        <p><em>Hukuk Birimi:</em> Ön değerlendirme başlatıldı.</p>
        <ul>
          <li>Dosya adı: “çekirdek neden kızardı”</li>
          <li>Maaş durumu: geçici olarak donduruldu</li>
          <li>Ek not: yangın tüpü zimmeti senden düşmedi</li>
        </ul>
      </article>
    `;
  } else if (/süre/i.test(summaryText)) {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Vardiya Sonu Notu</strong>
        <p><em>Maaş Çeki:</em> “Saat doldu, sistem dolmadı” kesintisi uygulandı.</p>
        <ul>
          <li>Merkez notu: kronometreyle kavga edilmez</li>
          <li>İdari işlem: mola süresi geçersiz sayıldı</li>
        </ul>
      </article>
    `;
  } else if (/stabilite|kararlılık/i.test(summaryText)) {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Merkez Bildirimi</strong>
        <p><em>Maaş Çeki:</em> gövde onarım fonuna yönlendirildi.</p>
        <ul>
          <li>Kesinti nedeni: zincirleme kararsızlık</li>
          <li>Merkez notu: “Her şeyi sallamamak da bir operatörlük biçimidir.”</li>
        </ul>
      </article>
    `;
  } else if (/kilit|pencere/i.test(summaryText)) {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Güvenlik Departmanı</strong>
        <p><em>Maaş Çeki:</em> erişim dondurma kesintisi uygulandı.</p>
        <ul>
          <li>Merkez notu: doğru kodu bulamayan operatör kapıda kaldı</li>
          <li>Ek takip: turnike yetkisi geçici gözlemde</li>
        </ul>
      </article>
    `;
  } else {
    extraItem = `
      <article class="outcome-item outcome-comic">
        <strong>Merkez Bildirimi</strong>
        <p><em>Maaş Çeki:</em> inceleme bitene kadar beklemede.</p>
        <ul>
          <li>Merkez notu: olay raporu okunurken herkes sessiz kaldı</li>
          <li>Ek açıklama: dava açılmadı ama kimse söz de vermedi</li>
        </ul>
      </article>
    `;
  }

  if (state.mistakes.length === 0) {
    els.outcomeDetails.innerHTML = `
      ${statsItem}
      ${extraItem}
      <div class="outcome-item"><strong>Kayıt</strong>Bu tur yanlış müdahale kaydı oluşmadı.</div>
    `;
    return;
  }
  els.outcomeDetails.innerHTML =
    statsItem +
    extraItem +
    state.mistakes
      .map(
        (mistake) => `
          <article class="outcome-item">
            <strong>${mistake.title}</strong>
            <p><em>Konu:</em> ${mistake.topic}</p>
            <p>${mistake.reason}</p>
            ${
              mistake.details && mistake.details.length
                ? `<ul>${mistake.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>`
                : ""
            }
          </article>
        `
      )
      .join("");
}

function goToMainMenu() {
  state.active = false;
  state.tutorialMode = false;
  hideTutorialGuide();
  state.booting = false;
  state.ending = false;
  state.endQueued = false;
  state.crisisResolved = false;
  state.interactionBaseLabel = "";
  state.timedCueSecond = null;
  state.runStartedAt = null;
  state.runFinishedAt = null;
  state.runPersisted = false;
  state.stats = {
    successCount: 0,
    scanCount: 0,
    utilityCount: 0,
    noiseCount: 0,
    lockCount: 0,
    maxHeat: START_HEAT,
  };
  state.heat = START_HEAT;
  state.safeBand = { min: 28, max: 42 };
  clearInterval(state.timerId);
  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);
  stopNoiseMotion();
  stopCoolingHold(false);
  state.scanBusy = false;
  state.lockEvent = null;
  state.noiseEvent = null;
  audioState.introPreviewQueued = false;
  audioState.introPreviewPlayed = false;
  document.body.classList.remove("boot-sequence", "shutdown-sequence", "failure-sequence");
  document.body.classList.remove("signal-jam");
  document.body.classList.add("prelaunch");
  setOverlay(els.scannerOverlay, false);
  setOverlay(els.coolingOverlay, false);
  setOverlay(els.notesOverlay, false);
  setOverlay(els.lockOverlay, false);
  setOverlay(els.noiseOverlay, false);
  setOverlay(els.bootOverlay, false);
  setOverlay(els.outcomeOverlay, false);
  setOverlay(els.startOverlay, true);
  els.startButton.disabled = false;
  delete els.outcomePanel.dataset.outcome;
  els.outcomeTag.textContent = "OPERASYON SONUCU";
  renderDifficultyPicker();
  updateHud();
  syncFireLoop();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function endGame(success, text) {
  if (state.ending) {
    return;
  }
  if (!state.runFinishedAt) {
    state.runFinishedAt = Date.now();
  }
  state.endQueued = false;
  state.ending = true;
  state.active = false;
  state.booting = false;
  hideTutorialGuide();
  fadeOutAmbientBed();
  document.body.classList.remove("boot-sequence", "shutdown-sequence", "failure-sequence");
  clearInterval(state.timerId);
  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);
  stopNoiseMotion();
  stopCoolingHold(false);
  state.scanBusy = false;
  state.lockEvent = null;
  state.noiseEvent = null;
  els.scanButton.disabled = false;
  setOverlay(els.scannerOverlay, false);
  setOverlay(els.coolingOverlay, false);
  setOverlay(els.notesOverlay, false);
  setOverlay(els.lockOverlay, false);
  setOverlay(els.noiseOverlay, false);
  setOverlay(els.bootOverlay, false);
  const profile = outcomeProfile(success, text);
  if (state.tutorialMode && success) {
    markTutorialCompleted();
    renderDifficultyPicker();
  }
  persistRunStats(profile);
  await playShutdownTransition(profile);
  els.outcomePanel.dataset.outcome = profile.key;
  els.outcomeTag.textContent = profile.tag;
  els.outcomeTitle.textContent = profile.title;
  els.outcomeText.textContent = profile.text;
  renderOutcomeDetails();
  const outcomeScroll = els.outcomePanel.querySelector(".outcome-scroll");
  if (outcomeScroll) {
    outcomeScroll.scrollTop = 0;
  }
  setOverlay(els.outcomeOverlay, true);
  playOutcomeReveal(profile);
  updateHud();
  state.ending = false;
  state.tutorialMode = false;
}

async function startGame(options = {}) {
  if (state.booting || state.ending) {
    return;
  }
  const tutorial = options.tutorial === true || (options.tutorial !== false && state.difficulty === "egitim");
  state.booting = true;
  await primeAudio();
  state.ending = false;
  state.endQueued = false;
  state.tutorialMode = tutorial;
  hideTutorialGuide();
  state.runStartedAt = Date.now();
  state.runFinishedAt = null;
  state.runPersisted = false;
  audioState.introPreviewQueued = false;
  els.startButton.disabled = true;
  document.body.classList.remove("prelaunch", "shutdown-sequence", "failure-sequence");
  const preset = tutorial ? difficultyPresets.kolay : currentDifficulty();
  state.active = false;
  state.timeLeft = tutorial ? 250 : preset.time;
  state.stability = 100;
  state.heat = START_HEAT;
  state.safeBand = generateSafeBand();
  state.currentIndex = -1;
  state.currentCrisis = null;
  state.crisisResolved = false;
  state.interactionBaseLabel = "";
  state.scanBusy = false;
  state.freezeTicks = 0;
  state.stabilityDrainTick = 0;
  state.heatRiseTick = 0;
  state.noiseCountdown = tutorial ? 9999 : nextNoiseDelay();
  state.notesPage = 0;
  state.terminalLines = [];
  state.mistakes = [];
  state.stats = {
    successCount: 0,
    scanCount: 0,
    utilityCount: 0,
    noiseCount: 0,
    lockCount: 0,
    maxHeat: START_HEAT,
  };
  state.boxReview = [];
  state.assignSelections = [];
  state.assignReview = [];
  state.lockEvent = null;
  state.noiseEvent = null;
  state.devPaused = false;
  state.warningCueSecond = null;
  state.heartbeatCueSecond = null;
  state.timedCueSecond = null;
  stopCoolingHold(false);
  state.utilities = {
    coolant: tutorial ? 3 : preset.utilities.coolant,
    intel: tutorial ? 3 : preset.utilities.intel,
    shield: preset.utilities.shield,
    stasis: preset.utilities.stasis,
    shieldArmed: false,
  };
  clearInterval(state.timerId);
  clearInterval(state.scanTickId);
  clearTimeout(state.scanTimeoutId);
  stopNoiseMotion();
  if (tutorial) {
    buildTutorialRun();
  } else {
    buildRun();
  }
  renderNotesPage();
  setOverlay(els.startOverlay, false);
  setOverlay(els.scannerOverlay, false);
  setOverlay(els.coolingOverlay, false);
  setOverlay(els.notesOverlay, false);
  setOverlay(els.lockOverlay, false);
  setOverlay(els.noiseOverlay, false);
  setOverlay(els.outcomeOverlay, false);
  setOverlay(els.bootOverlay, false);
  document.body.classList.remove("signal-jam");
  delete els.outcomePanel.dataset.outcome;
  els.outcomeTag.textContent = "OPERASYON SONUCU";
  els.scanMeta.textContent = "boşta";
  els.scanOutput.innerHTML = '<p class="terminal-line dim">[tarama] Konsol hazır.</p>';
  renderNoiseSteps();
  updateHud();
  syncFireLoop();
  window.scrollTo({ top: 0, behavior: "smooth" });
  await playBootTransition();
  state.active = true;
  state.timerId = window.setInterval(tick, 1000);
  state.booting = false;
  els.startButton.disabled = false;
  nextCrisis();
}

els.startButton.addEventListener("click", startGame);
els.tutorialGuideNext?.addEventListener("click", advanceTutorialGuide);
els.restartButton.addEventListener("click", startGame);
els.menuButton.addEventListener("click", goToMainMenu);
els.audioToggle.addEventListener("click", async () => {
  await primeAudio();
  audioState.enabled = !audioState.enabled;
  syncAudioMood(currentAudioMood());
  if (audioState.enabled) {
    playSfx("scan-done");
  }
  renderAudioButtons();
});
els.musicToggle.addEventListener("click", async () => {
  await primeAudio();
  audioState.musicEnabled = !audioState.musicEnabled;
  syncAudioMood(currentAudioMood());
  renderAudioButtons();
});
els.difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.difficulty = button.dataset.difficulty;
    renderDifficultyPicker();
  });
});
els.commandSubmit.addEventListener("click", handleCommand);
els.commandInput.addEventListener("keydown", (event) => {
  playTerminalKeypress(event);
  if (event.key === "Enter") {
    event.preventDefault();
    handleCommand();
  }
});
els.sequenceReset.addEventListener("click", resetSequenceArea);
els.sequenceSubmit.addEventListener("click", submitSequence);
els.classifyReset.addEventListener("click", resetClassifyArea);
els.classifySubmit.addEventListener("click", submitClassify);
els.assignReset.addEventListener("click", resetAssignArea);
els.assignSubmit.addEventListener("click", submitAssign);
els.multiReset.addEventListener("click", resetMultiArea);
els.multiSubmit.addEventListener("click", submitMulti);
els.compareReset.addEventListener("click", resetCompareArea);
els.compareSubmit.addEventListener("click", submitCompare);
els.stepperReset.addEventListener("click", resetStepperArea);
els.stepperSubmit.addEventListener("click", submitStepper);
els.tablePickSubmit.addEventListener("click", submitTablePick);
els.matrixReset.addEventListener("click", resetMatrixArea);
els.matrixSubmit.addEventListener("click", submitMatrix);
els.threatChoices.forEach((button) => {
  button.addEventListener("click", () => {
    state.threatLevel = button.dataset.level;
    renderThreatArea();
  });
});
els.threatSubmit.addEventListener("click", submitThreat);
els.boxReset.addEventListener("click", resetBoxArea);
els.boxSubmit.addEventListener("click", submitBox);
els.ignoreButton.addEventListener("click", ignoreCurrentCrisis);

els.openScanner.addEventListener("click", async () => {
  await primeAudio();
  setOverlay(els.scannerOverlay, true);
});
els.closeScanner.addEventListener("click", async () => {
  await primeAudio();
  setOverlay(els.scannerOverlay, false);
});
els.openCooling.addEventListener("click", async () => {
  await primeAudio();
  setOverlay(els.coolingOverlay, true);
});
els.closeCooling.addEventListener("click", async () => {
  await primeAudio();
  stopCoolingHold();
  setOverlay(els.coolingOverlay, false);
});
els.openNotes.addEventListener("click", async () => {
  await primeAudio();
  setOverlay(els.notesOverlay, true);
});
els.closeNotes.addEventListener("click", async () => {
  await primeAudio();
  setOverlay(els.notesOverlay, false);
});
els.coolantButton.addEventListener("click", useCoolant);
els.intelButton.addEventListener("click", useIntel);
els.shieldButton.addEventListener("click", useShield);
els.stasisButton.addEventListener("click", useStasis);

els.scanModeButtons.forEach((button) => {
  button.addEventListener("click", () => setScanMode(button.dataset.mode));
});
els.scanButton.addEventListener("click", startScan);
["pointerdown", "mousedown", "touchstart"].forEach((eventName) => {
  els.coolingHold.addEventListener(eventName, async (event) => {
    event.preventDefault();
    await primeAudio();
    startCoolingHold();
  });
});
["pointerup", "pointercancel", "mouseleave", "mouseup", "touchend", "touchcancel"].forEach((eventName) => {
  els.coolingHold.addEventListener(eventName, () => stopCoolingHold());
});

els.prevNote.addEventListener("click", () => {
  state.notesPage = (state.notesPage - 1 + notesPages.length) % notesPages.length;
  renderNotesPage();
});

els.nextNote.addEventListener("click", () => {
  state.notesPage = (state.notesPage + 1) % notesPages.length;
  renderNotesPage();
});

els.lockSubmit.addEventListener("click", submitLockEvent);
els.lockInput.addEventListener("keydown", (event) => {
  playTerminalKeypress(event);
  if (event.key === "Enter") {
    event.preventDefault();
    submitLockEvent();
  }
});
["click", "pointerdown", "touchstart"].forEach((eventName) => {
  els.noiseButton.addEventListener(eventName, requestNoiseResolve, { passive: false });
});
els.noiseButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    void requestNoiseResolve(event);
  }
});
els.noiseMatchLeft?.addEventListener("click", (event) => {
  const button = event.target.closest(".noise-port");
  if (!button) {
    return;
  }
  resolveNoiseMatch("left", button.dataset.key);
});
els.noiseMatchRight?.addEventListener("click", (event) => {
  const button = event.target.closest(".noise-port");
  if (!button) {
    return;
  }
  resolveNoiseMatch("right", button.dataset.key);
});

[els.notesOverlay, els.scannerOverlay, els.coolingOverlay].filter(Boolean).forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      if (overlay === els.coolingOverlay) {
        stopCoolingHold();
      }
      setOverlay(overlay, false);
    }
  });
});

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) {
    return;
  }

  await primeAudio();

  if (["audioToggle", "musicToggle", "coolantButton", "intelButton", "shieldButton", "stasisButton"].includes(button.id)) {
    return;
  }

  const strongButtons = new Set([
    "restartButton",
    "menuButton",
    "scanButton",
    "commandSubmit",
    "sequenceSubmit",
    "classifySubmit",
    "threatSubmit",
    "boxSubmit",
    "assignSubmit",
    "lockSubmit",
    "noiseButton",
    "coolingHold",
  ]);

  playSfx(strongButtons.has(button.id) ? "ui-strong" : "ui-soft");
});

fillAtomSelects();
renderNotesPage();
renderDifficultyPicker();
renderAudioButtons();
setScanMode("single");
renderThreatArea();
renderBoxArea();
renderNoiseSteps();
els.scanOutput.innerHTML = '<p class="terminal-line dim">[tarama] Konsol hazır.</p>';
updateHud();
