// ===============================
// BITÁCORA UI
// ===============================

function toggleBitacora(){
  let panel = byId('bitacora-panel');

  if(panel){
    panel.remove();
    return;
  }

  panel = document.createElement('div');
  panel.id = 'bitacora-panel';
  panel.className = 'bitacora-panel';

  panel.innerHTML = `
    <h3>Bitácora</h3>
    <input type="text" id="bit-search" placeholder="Buscar..." style="width:100%;margin-bottom:8px">
    <div id="bit-list"></div>
  `;

  document.body.appendChild(panel);
  renderBitacora();

  byId('bit-search').addEventListener('input', renderBitacora);
}

function renderBitacora(){
  const q = byId('bit-search')?.value?.toLowerCase() || '';
  const cont = byId('bit-list');

  cont.innerHTML = state.bitacora
    .filter(i => JSON.stringify(i).toLowerCase().includes(q))
    .map(i => `
      <div class="bitacora-item">
        <b>${i.tipo}</b><br>
        ${i.detalle}<br>
        <small>${i.fecha}</small>
      </div>
    `).join('');
}

// ===============================
// RESPALDO JSON
// ===============================

function exportJSON(){
  const data = JSON.stringify(state);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'respaldo.json';
  a.click();
}

function importJSON(e){
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(){
    const data = JSON.parse(reader.result);
    Object.assign(state, data);
    alert('Importado');
  };

  reader.readAsText(file);
}
