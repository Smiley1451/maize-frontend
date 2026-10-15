import React, { useState } from 'react'
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Zap,
  Activity,
  Dna,
  Sprout,
  ShieldAlert,
  FlaskConical,
  Calculator,
} from 'lucide-react'

export interface BenchmarkGenotype {
  id: string
  name: string
  group: 'yield' | 'tlb' | 'sdm'
  role: string
  notes: string
  preset: {
    days_to_50_percent_pollen_shedding: string
    days_to_50_percent_silking: string
    days_to_75_percent_dry_husk: string
    plant_height: string
    ear_height: string
    plant_stand: string
    shelling_percentage: string
  }
}

export const RESEARCH_BENCHMARKS: BenchmarkGenotype[] = [
  // 1. High-Yielding Hybrids & Checks
  {
    id: 'IMH 2-22R-10',
    name: 'IMH 2-22R-10',
    group: 'yield',
    role: 'Candidate Hybrid',
    notes: 'Top-performing medium-maturity hybrid (12.91 t/ha, +38.5% over check DHM 117 in Trial 1081)',
    preset: {
      days_to_50_percent_pollen_shedding: '68',
      days_to_50_percent_silking: '70',
      days_to_75_percent_dry_husk: '105',
      plant_height: '214',
      ear_height: '113',
      plant_stand: '70',
      shelling_percentage: '83.2',
    },
  },
  {
    id: 'DHM 117',
    name: 'DHM 117',
    group: 'yield',
    role: 'Standard Check Hybrid',
    notes: 'Standard check hybrid recorded at 9.32 t/ha (9,320 kg/ha) at ZARS Mandya',
    preset: {
      days_to_50_percent_pollen_shedding: '67',
      days_to_50_percent_silking: '69',
      days_to_75_percent_dry_husk: '102',
      plant_height: '198',
      ear_height: '95',
      plant_stand: '68',
      shelling_percentage: '79.5',
    },
  },
  {
    id: 'MAH 14-138',
    name: 'MAH 14-138',
    group: 'yield',
    role: 'Released Hybrid',
    notes: 'Recommended for release through review committees; high grain yield and stability',
    preset: {
      days_to_50_percent_pollen_shedding: '69',
      days_to_50_percent_silking: '71',
      days_to_75_percent_dry_husk: '108',
      plant_height: '220',
      ear_height: '115',
      plant_stand: '72',
      shelling_percentage: '84.0',
    },
  },
  {
    id: 'MAH 15-84',
    name: 'MAH 15-84',
    group: 'yield',
    role: 'Recommended Hybrid',
    notes: 'Recommended release hybrid with superior cob dimensions and test weight',
    preset: {
      days_to_50_percent_pollen_shedding: '70',
      days_to_50_percent_silking: '72',
      days_to_75_percent_dry_husk: '107',
      plant_height: '218',
      ear_height: '112',
      plant_stand: '71',
      shelling_percentage: '82.8',
    },
  },
  {
    id: 'MAH 14-5',
    name: 'MAH 14-5',
    group: 'yield',
    role: 'Demonstration Hybrid',
    notes: 'Demonstrated across field acres in AICRP maize trials in Karnataka',
    preset: {
      days_to_50_percent_pollen_shedding: '68',
      days_to_50_percent_silking: '70',
      days_to_75_percent_dry_husk: '104',
      plant_height: '210',
      ear_height: '106',
      plant_stand: '69',
      shelling_percentage: '81.4',
    },
  },
  {
    id: 'MAH-22-17',
    name: 'MAH-22-17',
    group: 'yield',
    role: 'Station Hybrid',
    notes: 'High-performing station hybrid with balanced vegetative and reproductive traits',
    preset: {
      days_to_50_percent_pollen_shedding: '66',
      days_to_50_percent_silking: '68',
      days_to_75_percent_dry_husk: '103',
      plant_height: '206',
      ear_height: '100',
      plant_stand: '70',
      shelling_percentage: '83.0',
    },
  },

  // 2. Turcicum Leaf Blight (TLB) Resistance Entries
  {
    id: 'AHD 8722',
    name: 'AHD 8722',
    group: 'tlb',
    role: 'TLB Resistant',
    notes: 'Late-maturity MPT-1 trial (1099); Mean TLB score: 3.0 (Scale 1–9), Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '71',
      days_to_50_percent_silking: '73',
      days_to_75_percent_dry_husk: '112',
      plant_height: '188',
      ear_height: '90',
      plant_stand: '67',
      shelling_percentage: '78.5',
    },
  },
  {
    id: 'MMH 22-62',
    name: 'MMH 22-62',
    group: 'tlb',
    role: 'TLB Resistant',
    notes: 'Late-maturity MPT-1 trial; Mean TLB score: 2.4 (Scale 1–9), Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '70',
      days_to_50_percent_silking: '72',
      days_to_75_percent_dry_husk: '110',
      plant_height: '192',
      ear_height: '94',
      plant_stand: '68',
      shelling_percentage: '79.2',
    },
  },
  {
    id: 'ADV 7559',
    name: 'ADV 7559',
    group: 'tlb',
    role: 'Dual Resistant',
    notes: 'TLB Score: 2.8 (Resistant), SDM PDI: 20.0% (Moderately Resistant)',
    preset: {
      days_to_50_percent_pollen_shedding: '66',
      days_to_50_percent_silking: '68',
      days_to_75_percent_dry_husk: '104',
      plant_height: '205',
      ear_height: '102',
      plant_stand: '69',
      shelling_percentage: '81.5',
    },
  },
  {
    id: 'PM 21207L',
    name: 'PM 21207L',
    group: 'tlb',
    role: 'TLB Resistant',
    notes: 'Late-maturity MPT-1 trial; Mean TLB score: 2.6 (Scale 1–9), Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '69',
      days_to_50_percent_silking: '71',
      days_to_75_percent_dry_husk: '109',
      plant_height: '196',
      ear_height: '96',
      plant_stand: '69',
      shelling_percentage: '80.0',
    },
  },
  {
    id: 'ADV 7733',
    name: 'ADV 7733',
    group: 'tlb',
    role: 'TLB Resistant',
    notes: 'Late-maturity MPT-1 trial; Mean TLB score: 2.1 (Scale 1–9), Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '68',
      days_to_50_percent_silking: '70',
      days_to_75_percent_dry_husk: '106',
      plant_height: '194',
      ear_height: '92',
      plant_stand: '68',
      shelling_percentage: '80.5',
    },
  },
  {
    id: 'CM-202',
    name: 'CM-202',
    group: 'tlb',
    role: 'TLB Susceptible Check',
    notes: 'Standard susceptible check in TLB screening; Mean TLB score: 6.5 (Reaction: MS)',
    preset: {
      days_to_50_percent_pollen_shedding: '65',
      days_to_50_percent_silking: '68',
      days_to_75_percent_dry_husk: '100',
      plant_height: '175',
      ear_height: '82',
      plant_stand: '65',
      shelling_percentage: '74.0',
    },
  },

  // 3. Sorghum Downy Mildew (SDM) Resistance Entries
  {
    id: 'SMH 6333',
    name: 'SMH 6333',
    group: 'sdm',
    role: 'SDM Resistant',
    notes: 'Late-maturity SDM screening; Percent Disease Index (PDI): 4.2%, Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '68',
      days_to_50_percent_silking: '70',
      days_to_75_percent_dry_husk: '106',
      plant_height: '210',
      ear_height: '108',
      plant_stand: '70',
      shelling_percentage: '82.0',
    },
  },
  {
    id: 'KMH 8333',
    name: 'KMH 8333',
    group: 'sdm',
    role: 'SDM Resistant',
    notes: 'Late-maturity SDM screening; PDI: 3.6%, Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '69',
      days_to_50_percent_silking: '71',
      days_to_75_percent_dry_husk: '108',
      plant_height: '212',
      ear_height: '110',
      plant_stand: '71',
      shelling_percentage: '82.5',
    },
  },
  {
    id: 'TMMH 2882',
    name: 'TMMH 2882',
    group: 'sdm',
    role: 'SDM Resistant',
    notes: 'Late-maturity SDM screening; PDI: 9.3%, Reaction: Resistant (R)',
    preset: {
      days_to_50_percent_pollen_shedding: '67',
      days_to_50_percent_silking: '69',
      days_to_75_percent_dry_husk: '105',
      plant_height: '208',
      ear_height: '104',
      plant_stand: '69',
      shelling_percentage: '81.2',
    },
  },
  {
    id: 'NAH-1137',
    name: 'NAH-1137',
    group: 'sdm',
    role: 'SDM Resistant Check',
    notes: 'Standard resistant check in SDM station trials; Recorded PDI: 6.5%, Reaction: R',
    preset: {
      days_to_50_percent_pollen_shedding: '67',
      days_to_50_percent_silking: '69',
      days_to_75_percent_dry_husk: '105',
      plant_height: '202',
      ear_height: '98',
      plant_stand: '71',
      shelling_percentage: '80.5',
    },
  },
  {
    id: 'African Tall',
    name: 'African Tall',
    group: 'sdm',
    role: 'SDM Susceptible Check',
    notes: 'Standard susceptible check; High PDI of 90.3% – 98.7% confirms severe disease pressure',
    preset: {
      days_to_50_percent_pollen_shedding: '64',
      days_to_50_percent_silking: '67',
      days_to_75_percent_dry_husk: '98',
      plant_height: '235',
      ear_height: '128',
      plant_stand: '62',
      shelling_percentage: '72.0',
    },
  },
]

export interface FieldExplanation {
  key: string
  label: string
  unit: string
  shortDesc: string
  meaning: string
  biologicalRole: string
  formula?: string
  benchmarks?: string
  experimentalContext?: string
}

export const FIELD_EXPLANATIONS: Record<string, FieldExplanation> = {
  genotype: {
    key: 'genotype',
    label: 'Genotype',
    unit: 'Text / Identifier',
    shortDesc: 'Name or code of the maize entry being evaluated',
    meaning:
      'The designated name or breeding code of the specific maize variety, hybrid, inbred line, or check being evaluated. It differentiates genetic backgrounds tested in AICRP trials at ZARS, Mandya.',
    biologicalRole:
      'Genetic identity dictates potential grain yield, plant architecture, maturity class, and innate resistance to foliar pathogens like Turcicum Leaf Blight (Exserohilum turcicum) and Sorghum Downy Mildew (Peronosclerospora sorghi).',
    benchmarks:
      'Candidate hybrid: IMH 2-22R-10 (12.91 t/ha); Check hybrid: DHM 117 (9.32 t/ha); TLB check: CM-202 (Score: 6.5 MS); SDM check: African Tall (PDI: 90.3%).',
    experimentalContext:
      'Evaluated across coordinated trials (NIVT, MPT-1) in randomized Alpha designs and RBDs.',
  },
  days_to_50_percent_pollen_shedding: {
    key: 'days_to_50_percent_pollen_shedding',
    label: 'Days to 50% pollen shedding',
    unit: 'Days (DAS)',
    shortDesc: 'Days from sowing until ~50% plants shed pollen',
    meaning:
      'The number of days after sowing (DAS) until approximately half (50%) of the plants in the experimental plot show visible anther dehiscence and pollen release from the tassel.',
    biologicalRole:
      'Indicates male reproductive flowering timing. When combined with silking date, it determines flowering synchrony.',
    formula:
      'Pollen Shedding Date - Sowing Date (in days). Evaluated on a whole-plot visual threshold.',
    benchmarks:
      'Typically 64 to 72 days in Rabi trials at ZARS, Mandya (e.g. 68 days in IMH 2-22R-10; 67 days in DHM 117).',
    experimentalContext:
      'Recorded at ZARS, Mandya under irrigated conditions with NPK 150:75:40 kg/ha.',
  },
  days_to_50_percent_silking: {
    key: 'days_to_50_percent_silking',
    label: 'Days to 50% silking',
    unit: 'Days (DAS)',
    shortDesc: 'Days from sowing until ~50% plants show emerged silks',
    meaning:
      'The number of days after sowing until approximately half (50%) of the plants in the plot have extruded receptive silks from the ear shoot.',
    biologicalRole:
      'Measures female flowering timing. Crucial for calculating the Anthesis–Silking Interval (ASI = Silking - Pollen Shedding). An interval of 1–3 days guarantees overlapping pollen availability for successful fertilization and full kernel set.',
    formula:
      'ASI (days) = Days to 50% Silking - Days to 50% Pollen Shedding (e.g., 70 - 68 = 2 days).',
    benchmarks:
      'Generally occurs 2 to 3 days after pollen shedding (e.g. 70 days for IMH 2-22R-10; 69 days for DHM 117).',
    experimentalContext:
      'Drought and heat stress can delay silking while pollen shedding remains unchanged, widening ASI and causing barren cobs.',
  },
  days_to_75_percent_dry_husk: {
    key: 'days_to_75_percent_dry_husk',
    label: 'Days to 75% dry husk (Maturity)',
    unit: 'Days (DAS)',
    shortDesc: 'Days from sowing until 75% plants reach dry husk stage',
    meaning:
      'The number of days from planting until 75% of the maize ears exhibit dry, straw-colored husk leaves, marking physiological maturity (black layer formation).',
    biologicalRole:
      'Defines the crop growth duration and classifies maize into early (<90 days), medium (90–105 days), or late (>105 days) maturity groups.',
    benchmarks:
      'Reported around 100 to 112 days in medium/late-maturity trials at ZARS, Mandya.',
    experimentalContext:
      'Determines harvest schedule and season-length fit for cropping rotations.',
  },
  plant_height: {
    key: 'plant_height',
    label: 'Plant height',
    unit: 'Centimeters (cm)',
    shortDesc: 'Height of the maize plant from soil base to tassel tip',
    meaning:
      'The vertical distance measured from the soil surface to the base of the tassel or uppermost node of the mature maize plant.',
    biologicalRole:
      'Reflects vegetative vigor, photosynthetic leaf area, and total plant biomass. However, excessive plant height without proportionate stalk thickness increases susceptibility to stem lodging during heavy winds or rain.',
    benchmarks:
      'Typically ranges from 180 cm to 240 cm in irrigated field trials (e.g., 214 cm in IMH 2-22R-10; 198 cm in DHM 117).',
    experimentalContext:
      'Measured on representative plants per plot across replications.',
  },
  ear_height: {
    key: 'ear_height',
    label: 'Ear height',
    unit: 'Centimeters (cm)',
    shortDesc: 'Height of the main ear insertion point above ground',
    meaning:
      'The vertical distance from the soil level to the node where the primary (topmost productive) ear is attached to the stalk.',
    biologicalRole:
      'Crucial structural breeding trait. A lower ear height relative to plant height (ear placement ratio around 0.45–0.50) lowers the center of gravity, significantly reducing root lodging and stalk breakage.',
    benchmarks:
      'Typically ranges from 85 cm to 125 cm (e.g., 113 cm in IMH 2-22R-10; 95 cm in DHM 117).',
    experimentalContext:
      'Optimal ear placement also ensures clearance for mechanized or manual harvesting.',
  },
  plant_stand: {
    key: 'plant_stand',
    label: 'Plant stand (Population)',
    unit: 'Thousand plants / ha',
    shortDesc: 'Plant population density in thousands per hectare',
    meaning:
      'The plant population established per hectare, expressed in thousands. A recorded entry of 70.0 in the report corresponds to 70,000 plants per hectare.',
    biologicalRole:
      'Plant density directly controls light interception, canopy microclimate, and competition for soil moisture and NPK nutrients. Too low a density loses yield potential per hectare; excessive density causes barrenness and stalk lodging.',
    formula:
      'Total Population (plants/ha) = Value × 1,000. Calculated from established plants per plot area.',
    benchmarks:
      'Recorded at 65.0 to 72.0 thousand plants/ha (65,000 to 72,000 plants/ha) under 60 × 20 cm spacing.',
    experimentalContext:
      'Spacing in yield trials was 60 × 20 cm (plot size 4.8 m² or 9.6 m²); spacing in disease screening was 60 × 30 cm.',
  },
  shelling_percentage: {
    key: 'shelling_percentage',
    label: 'Shelling percentage',
    unit: 'Percentage (%)',
    shortDesc: 'Proportion of harvested ear weight represented by grain',
    meaning:
      'The ratio of harvested dry grain weight to the total weight of un-shelled ears (grain plus cob rachis), expressed as a percentage.',
    biologicalRole:
      'Measures partitioning efficiency between grain and cob skeleton. A higher shelling percentage indicates thin cobs, deep kernel rows, and high grain recovery.',
    formula:
      'Shelling % = (Grain Weight / Total Ear Weight) × 100. (e.g., 200 g grain from 250 g ear = 80%).',
    benchmarks:
      'Values in high-yielding hybrids typically range from 80% to 85% (e.g., 83.2% in IMH 2-22R-10; 79.5% in DHM 117).',
    experimentalContext:
      'Determined after harvesting and drying ears to standard moisture content.',
  },
}

export function PredictionFieldGuide() {
  const [activeTab, setActiveTab] = useState<'inputs' | 'yield' | 'disease' | 'trial'>('inputs')
  const [search, setSearch] = useState('')

  return (
    <section className="panel field-guide-panel">
      <div className="panel-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="field-guide-orb">
            <BookOpen size={18} />
          </span>
          <div>
            <h2>Research Data Field Guide & Phenotype Reference</h2>
            <p>
              Detailed explanations, formulas, units, and trial context derived from ZARS Mandya AICRP Maize reports.
            </p>
          </div>
        </div>
        <div className="guide-tab-nav">
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'inputs' ? 'active' : ''}`}
            onClick={() => setActiveTab('inputs')}
          >
            <Calculator size={13} /> Prediction Inputs
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'yield' ? 'active' : ''}`}
            onClick={() => setActiveTab('yield')}
          >
            <Sprout size={13} /> Agronomic Phenotypes
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'disease' ? 'active' : ''}`}
            onClick={() => setActiveTab('disease')}
          >
            <ShieldAlert size={13} /> Disease Pathology
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'trial' ? 'active' : ''}`}
            onClick={() => setActiveTab('trial')}
          >
            <FlaskConical size={13} /> Trial Parameters
          </button>
        </div>
      </div>

      <div className="guide-content">
        {/* TAB 1: Prediction Inputs */}
        {activeTab === 'inputs' && (
          <div className="guide-grid">
            {Object.values(FIELD_EXPLANATIONS).map(field => (
              <div className="guide-card" key={field.key}>
                <div className="guide-card-header">
                  <div>
                    <b className="guide-card-title">{field.label}</b>
                    <code className="guide-card-key">{field.key}</code>
                  </div>
                  <span className="guide-unit-chip">{field.unit}</span>
                </div>
                <p className="guide-card-desc">{field.meaning}</p>
                <div className="guide-detail-row">
                  <small>BIOLOGICAL ROLE</small>
                  <span>{field.biologicalRole}</span>
                </div>
                {field.formula && (
                  <div className="guide-formula-box">
                    <small>CALCULATION / FORMULA</small>
                    <code>{field.formula}</code>
                  </div>
                )}
                {field.benchmarks && (
                  <div className="guide-benchmark-box">
                    <small>TRIAL BENCHMARK VALUES</small>
                    <span>{field.benchmarks}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Agronomic Phenotypes */}
        {activeTab === 'yield' && (
          <div className="guide-table-container">
            <p className="guide-tab-intro">
              Crop improvement research evaluates which genotypes grow well and produce maximum grain under test conditions. Below are all 14 phenotypes measured across trials at ZARS, Mandya:
            </p>
            <table className="markdown-table">
              <thead>
                <tr>
                  <th>Data Field</th>
                  <th>Unit</th>
                  <th>Biological Meaning & Breeding Utility</th>
                  <th>Typical Trial Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Genotype</b></td>
                  <td>Text</td>
                  <td>Name or code of the entry (hybrid, candidate breeding line, or check).</td>
                  <td>IMH 2-22R-10, DHM 117, MAH 14-138</td>
                </tr>
                <tr>
                  <td><b>Days to 50% pollen shedding</b></td>
                  <td>Days (DAS)</td>
                  <td>Days from sowing until ~50% plants shed pollen. Measures male flowering.</td>
                  <td>65 – 72 days</td>
                </tr>
                <tr>
                  <td><b>Days to 50% silking</b></td>
                  <td>Days (DAS)</td>
                  <td>Days until ~50% plants show silks. Determines Anthesis-Silking Interval (ASI).</td>
                  <td>67 – 75 days</td>
                </tr>
                <tr>
                  <td><b>Days to 75% dry husk</b></td>
                  <td>Days (DAS)</td>
                  <td>Days until 75% ears exhibit dry husk, marking physiological maturity.</td>
                  <td>98 – 112 days</td>
                </tr>
                <tr>
                  <td><b>Plant height</b></td>
                  <td>cm</td>
                  <td>Distance from soil surface to tassel tip. Reflects biomass and vigor.</td>
                  <td>180 – 240 cm</td>
                </tr>
                <tr>
                  <td><b>Ear height</b></td>
                  <td>cm</td>
                  <td>Distance from soil to main ear node. Lower ear height prevents lodging.</td>
                  <td>85 – 125 cm</td>
                </tr>
                <tr>
                  <td><b>Plant stand</b></td>
                  <td>'000 plants/ha</td>
                  <td>Plant population density (Value × 1,000 = total plants/ha).</td>
                  <td>65.0 – 72.0 thousand/ha</td>
                </tr>
                <tr>
                  <td><b>Shelling percentage</b></td>
                  <td>%</td>
                  <td>(Grain weight / Ear weight) × 100%. Indicates grain partitioning efficiency.</td>
                  <td>78% – 85%</td>
                </tr>
                <tr>
                  <td><b>Grain yield</b></td>
                  <td>t/ha or kg/ha</td>
                  <td>Total grain produced per hectare (1 t/ha = 1,000 kg/ha).</td>
                  <td>Candidate: 12.91 t/ha; Check: 9.32 t/ha</td>
                </tr>
                <tr>
                  <td><b>Cob length</b></td>
                  <td>cm</td>
                  <td>Length of the ear from base to tip; provides area for kernel rows.</td>
                  <td>15.0 – 22.0 cm</td>
                </tr>
                <tr>
                  <td><b>Cob girth</b></td>
                  <td>cm</td>
                  <td>Circumference/girth of the cob indicating ear thickness.</td>
                  <td>4.5 – 6.0 cm</td>
                </tr>
                <tr>
                  <td><b>Number of cob rows</b></td>
                  <td>Count</td>
                  <td>Number of grain rows around the cob.</td>
                  <td>12 – 18 rows/cob</td>
                </tr>
                <tr>
                  <td><b>Grains per row</b></td>
                  <td>Count</td>
                  <td>Number of kernels along a single row on the cob.</td>
                  <td>25 – 45 grains/row</td>
                </tr>
                <tr>
                  <td><b>Test weight</b></td>
                  <td>g</td>
                  <td>Weight of a defined grain sample (e.g. 100-grain weight in grams).</td>
                  <td>30.0 – 42.0 g</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: Disease Pathology */}
        {activeTab === 'disease' && (
          <div className="guide-disease-container">
            <div className="guide-callout-grid">
              <div className="guide-callout-card">
                <span className="guide-callout-badge tone-red">TURCICUM LEAF BLIGHT (TLB)</span>
                <h4>Pathogen: <i>Exserohilum turcicum</i></h4>
                <p>
                  Evaluated using a <b>unitless 1–9 ordinal disease scale</b>. Lower scores represent less disease; higher scores represent severe leaf blighting.
                </p>
                <div className="guide-scale-list">
                  <div><span>1.0 – 3.0</span> <b className="text-green">R (Resistant)</b> — e.g. AHD 8722 (3.0), ADV 7733 (2.1)</div>
                  <div><span>3.1 – 5.0</span> <b>MR (Moderately Resistant)</b></div>
                  <div><span>5.1 – 7.0</span> <b className="text-amber">MS (Moderately Susceptible)</b> — e.g. CM-202 Check (6.5)</div>
                  <div><span>7.1 – 9.0</span> <b className="text-red">S (Susceptible)</b></div>
                </div>
                <div className="guide-callout-footer">
                  <small>Maximum recorded yield loss due to TLB in Karnataka: <b>40.4%</b>.</small>
                </div>
              </div>

              <div className="guide-callout-card">
                <span className="guide-callout-badge tone-amber">SORGHUM DOWNY MILDEW (SDM)</span>
                <h4>Pathogen: <i>Peronosclerospora sorghi</i></h4>
                <p>
                  Evaluated using <b>Percent Disease Index (PDI, %)</b> rather than an ordinal score.
                </p>
                <div className="guide-formula-box" style={{ margin: '8px 0' }}>
                  <small>PDI FORMULA</small>
                  <code>PDI (%) = [ Σ(Ratings) / (No. Obs × Max Rating) ] × 100</code>
                </div>
                <div className="guide-scale-list">
                  <div><span>PDI &lt; 10%</span> <b className="text-green">R (Resistant)</b> — e.g. SMH 6333 (4.2%), NAH-1137 (6.5%)</div>
                  <div><span>PDI 10–25%</span> <b>MR (Moderately Resistant)</b> — e.g. ADV 7559 (20.0%)</div>
                  <div><span>PDI &gt; 50%</span> <b className="text-red">Susceptible Check</b> — African Tall (90.3% – 98.7%)</div>
                </div>
              </div>
            </div>

            <div className="guide-table-container" style={{ marginTop: '16px' }}>
              <h4>Incidence vs. Severity vs. PDI vs. Yield Loss</h4>
              <table className="markdown-table">
                <thead>
                  <tr>
                    <th>Concept</th>
                    <th>Unit</th>
                    <th>What it Measures</th>
                    <th>Formula / Calculation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Disease Incidence</b></td>
                    <td>%</td>
                    <td>Proportion of plants showing any disease symptoms</td>
                    <td><code>(Affected Plants / Total Plants) × 100</code></td>
                  </tr>
                  <tr>
                    <td><b>Disease Severity</b></td>
                    <td>1–9 scale or %</td>
                    <td>Area or proportion of plant tissue damaged by lesions</td>
                    <td>Visual grading scale (1 to 9)</td>
                  </tr>
                  <tr>
                    <td><b>PDI (Percent Disease Index)</b></td>
                    <td>%</td>
                    <td>Standardized index summarizing disease rating scores</td>
                    <td><code>[Σ Ratings / (N × Max Score)] × 100</code></td>
                  </tr>
                  <tr>
                    <td><b>Yield Loss</b></td>
                    <td>%</td>
                    <td>Reduction in grain harvest caused by disease damage</td>
                    <td><code>[(Healthy Yield - Diseased Yield) / Healthy Yield] × 100</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Trial Parameters */}
        {activeTab === 'trial' && (
          <div className="guide-table-container">
            <p className="guide-tab-intro">
              Summary of field conditions, plot dimensions, and agronomic management across AICRP Maize trials at ZARS, Mandya:
            </p>
            <table className="markdown-table">
              <thead>
                <tr>
                  <th>Experimental Parameter</th>
                  <th>Value Recorded in Relevant Trials</th>
                  <th>Agronomic Purpose & Standard Practice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Location</b></td>
                  <td>ZARS, Mandya (UAS Bengaluru)</td>
                  <td>Southern Dry Zone of Karnataka (Zone 6), dedicated AICRP maize testing station.</td>
                </tr>
                <tr>
                  <td><b>Season</b></td>
                  <td>Rabi 2022–23 & 2023–24</td>
                  <td>Post-monsoon winter cropping season with controlled furrow irrigation.</td>
                </tr>
                <tr>
                  <td><b>Experimental Design</b></td>
                  <td>Alpha Lattice Design & RBD</td>
                  <td>Controls soil fertility gradients across plots to minimize experimental error.</td>
                </tr>
                <tr>
                  <td><b>Replications</b></td>
                  <td>2 in disease screening; 3 in yield trials</td>
                  <td>Repeated experimental plots per entry to isolate genetic variation.</td>
                </tr>
                <tr>
                  <td><b>Plant Spacing</b></td>
                  <td>60 × 20 cm (yield) / 60 × 30 cm (disease)</td>
                  <td>60 cm inter-row, 20 cm intra-row in yield trials; 30 cm intra-row in disease nursery.</td>
                </tr>
                <tr>
                  <td><b>Fertilizer Application</b></td>
                  <td>N:P:K = 150:75:40 kg/ha</td>
                  <td>Standard nutrient recommendation for irrigated hybrid maize in Karnataka.</td>
                </tr>
                <tr>
                  <td><b>Plot Size</b></td>
                  <td>4.8 m² (yield) / 1 row × 2.5 m (disease)</td>
                  <td>Net harvested area used to extrapolate grain yield to t/ha and kg/ha.</td>
                </tr>
                <tr>
                  <td><b>Spreader Rows (SR)</b></td>
                  <td>African Tall / CM-202</td>
                  <td>Planted around test entries to ensure uniform, high natural pathogen pressure.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
