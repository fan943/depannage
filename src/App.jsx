import { useState } from 'react'
import './App.css'

const ETATS_ARRIVEE = [
  { value: '', label: '— état du SSI —' },
  { value: "était en état de veille", label: "État de veille" },
  { value: "était en état de sécurité", label: "État de sécurité" },
  { value: "était en état d'anomalie", label: "État d'anomalie" },
  { value: "était en état de dérangement", label: "État de dérangement" },
  { value: "était en état d'alarme feu", label: "État d'alarme feu" },
]

const ETATS_DEPART = [
  { value: '', label: '— état du SSI —' },
  { value: "était en état de veille", label: "État de veille" },
  { value: "était en état de sécurité", label: "État de sécurité" },
  { value: "était en état d'anomalie", label: "État d'anomalie" },
  { value: "demeurait en état de dérangement", label: "État de dérangement" },
  { value: "était en état d'alarme feu", label: "État d'alarme feu" },
]

export default function App() {
  const [etatArrivee, setEtatArrivee] = useState('')
  const [detailArrivee, setDetailArrivee] = useState('')
  const [intervention, setIntervention] = useState('')
  const [etatDepart, setEtatDepart] = useState('')
  const [detailDepart, setDetailDepart] = useState('')
  const [rapport, setRapport] = useState('')
  const [copie, setCopie] = useState(false)

  function generer() {
    let txt = ''

    if (etatArrivee || detailArrivee) {
      txt += `À la prise en charge du site, ${etatArrivee ? etatArrivee + ' :' : ''}\n`
      if (detailArrivee) txt += detailArrivee + '\n'
    }

    if (intervention) {
      txt += '\n' + intervention + '\n'
    }

    if (etatDepart || detailDepart) {
      txt += `\nAvant restitution du site, ${etatDepart ? etatDepart + ' :' : ''}\n`
      if (detailDepart) txt += detailDepart
    }

    return txt.trim()
  }

  function handleGenerer() {
    const txt = generer()
    setRapport(txt)
  }

  function handleCopier() {
    const txt = rapport || generer()
    if (!txt) return
    setRapport(txt)
    navigator.clipboard.writeText(txt).then(() => {
      setCopie(true)
      setTimeout(() => setCopie(false), 2200)
    })
  }

  function handleReset() {
    setEtatArrivee('')
    setDetailArrivee('')
    setIntervention('')
    setEtatDepart('')
    setDetailDepart('')
    setRapport('')
  }

  return (
    <div className="container">
      <header>
        <h1>Gabarit Rapport SSI</h1>
        <p className="subtitle">Dépannage · DEF</p>
      </header>

      <main>
        {/* ARRIVÉE */}
        <section className="bloc">
          <div className="bloc-header">
            <span className="badge badge-arrivee">Arrivée</span>
          </div>
          <div className="row-inline">
            <span className="label-fixed">À la prise en charge du site,</span>
            <select value={etatArrivee} onChange={e => setEtatArrivee(e.target.value)}>
              {ETATS_ARRIVEE.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <label className="field-label">Détail de l'état à l'arrivée</label>
          <textarea
            rows={4}
            value={detailArrivee}
            onChange={e => setDetailArrivee(e.target.value)}
            placeholder={"Ex : l'ECS TB CONFÉRENCE A S3 présentait les dérangements suivants :\n• Z15/A113 CIRCULATION COMMUNE NIV. LIVRAISON (adresse absente)\n• Z13/A101 CIRCULATION COMMUNE NIV. LIVRAISON TA (encrassement max)"}
          />
        </section>

        <div className="divider" />

        {/* INTERVENTION */}
        <section className="bloc">
          <div className="bloc-header">
            <span className="badge badge-intervention">Intervention réalisée</span>
          </div>
          <textarea
            rows={5}
            value={intervention}
            onChange={e => setIntervention(e.target.value)}
            placeholder="Ex : Contrôle du détecteur Z13/A101 effectué sur place. Lecture via BTCL-X confirmant un encrassement au seuil maximum. Remplacement du détecteur à programmer."
          />
        </section>

        <div className="divider" />

        {/* DÉPART */}
        <section className="bloc">
          <div className="bloc-header">
            <span className="badge badge-depart">Départ</span>
          </div>
          <div className="row-inline">
            <span className="label-fixed">Avant restitution du site,</span>
            <select value={etatDepart} onChange={e => setEtatDepart(e.target.value)}>
              {ETATS_DEPART.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <label className="field-label">Détail de l'état au départ</label>
          <textarea
            rows={4}
            value={detailDepart}
            onChange={e => setDetailDepart(e.target.value)}
            placeholder={"Ex : l'ECS TB CONFÉRENCE A S3 demeurait en état de dérangement :\n• Z15/A113 CIRCULATION COMMUNE NIV. LIVRAISON (adresse absente)\n• Z13/A101 CIRCULATION COMMUNE NIV. LIVRAISON TA (encrassement max)"}
          />
        </section>

        {/* ACTIONS */}
        <div className="actions">
          <button className="btn btn-secondary" onClick={handleReset}>Réinitialiser</button>
          <button className="btn btn-secondary" onClick={handleGenerer}>Générer</button>
          <button className="btn btn-primary" onClick={handleCopier}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copier
          </button>
        </div>

        {/* PREVIEW */}
        {rapport && (
          <section className="preview-section">
            <div className="preview-header">
              <span className="field-label" style={{ margin: 0 }}>Rapport généré</span>
              <button className="btn-copy-small" onClick={handleCopier}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copier
              </button>
            </div>
            <pre>{rapport}</pre>
          </section>
        )}
      </main>

      {copie && <div className="toast">Rapport copié ✓</div>}
    </div>
  )
}
