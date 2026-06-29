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
  const [nomECS, setNomECS] = useState('')
  const [etatArrivee, setEtatArrivee] = useState('')
  const [defautsArrivee, setDefautsArrivee] = useState('')
  const [intervention, setIntervention] = useState('')
  const [etatDepart, setEtatDepart] = useState('')
  const [defautsDepart, setDefautsDepart] = useState('')
  const [rapport, setRapport] = useState('')
  const [copie, setCopie] = useState(false)

  function formaterDefauts(texte) {
    return texte.split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .map(l => l.startsWith('•') ? l : '• ' + l)
      .join('\n')
  }

  function generer() {
    let txt = ''
    const ecs = nomECS.trim()

    if (etatArrivee || defautsArrivee) {
      txt += `À la prise en charge du site, ${ecs ? 'l\'' + ecs + ' ' : ''}${etatArrivee} :`
      if (defautsArrivee) txt += '\n' + formaterDefauts(defautsArrivee)
      txt += '\n'
    }

    if (intervention) {
      txt += '\n' + intervention.trim() + '\n'
    }

    if (etatDepart || defautsDepart) {
      txt += `\nAvant restitution du site, ${ecs ? 'l\'' + ecs + ' ' : ''}${etatDepart} :`
      if (defautsDepart) txt += '\n' + formaterDefauts(defautsDepart)
    }

    return txt.trim()
  }

  function handleGenerer() {
    setRapport(generer())
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
    setNomECS('')
    setEtatArrivee('')
    setDefautsArrivee('')
    setIntervention('')
    setEtatDepart('')
    setDefautsDepart('')
    setRapport('')
  }

  return (
    <div className="container">
      <header>
        <h1>Gabarit Rapport SSI</h1>
        <p className="subtitle">Dépannage · DEF</p>
      </header>

      <main>
        <section className="bloc">
          <div className="bloc-header">
            <span className="badge badge-ecs">Équipement</span>
          </div>
          <label className="field-label">Nom de l'ECS</label>
          <input
            type="text"
            value={nomECS}
            onChange={e => setNomECS(e.target.value)}
            placeholder="Ex : ECS TB CONFÉRENCE A S3"
          />
        </section>

        <div className="divider" />

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
          <label className="field-label">Défauts à l'arrivée (un par ligne)</label>
          <textarea
            rows={4}
            value={defautsArrivee}
            onChange={e => setDefautsArrivee(e.target.value)}
            placeholder={"Z15/A113 CIRCULATION COMMUNE NIV. LIVRAISON (adresse absente)\nZ13/A101 CIRCULATION COMMUNE NIV. LIVRAISON TA (encrassement max)"}
          />
        </section>

        <div className="divider" />

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
          <label className="field-label">Défauts au départ (un par ligne)</label>
          <textarea
            rows={4}
            value={defautsDepart}
            onChange={e => setDefautsDepart(e.target.value)}
            placeholder={"Z15/A113 CIRCULATION COMMUNE NIV. LIVRAISON (adresse absente)\nZ13/A101 CIRCULATION COMMUNE NIV. LIVRAISON TA (encrassement max)"}
          />
        </section>

        <div className="actions">
          <button className="btn btn-secondary" onClick={handleReset}>Réinitialiser</button>
          <button className="btn btn-secondary" onClick={handleGenerer}>Générer</button>
          <button className="btn btn-primary" onClick={handleCopier}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copier
          </button>
        </div>

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
