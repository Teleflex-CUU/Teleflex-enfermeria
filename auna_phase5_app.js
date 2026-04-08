// ===============================
// CONSULTAS
// ===============================

function getConsultaByFolio(folio){
  return (state.consultas || []).find(c => c.folio === folio);
}

function buildConsultaFromForm(){
  const g=id=>byId(id)?.value||'';

  return {
    folio:'TEMP-'+Date.now(),
    fecha:g('f-fecha'),
    hora:g('f-hora'),
    nombre:state.empActual?.nombre || '',
    noEmp:state.empActual?.noEmp || '',
    diagnostico:g('f-dg'),
    plan:g('f-plan'),
    motivo:g('f-motivo')
  };
}

function validarConsulta(c){
  if(!c.noEmp) return 'Selecciona empleado';
  if(!c.fecha) return 'Falta fecha';
  if(!c.diagnostico) return 'Falta diagnóstico';
  return null;
}

function guardarConsulta(){
  try{
    const c = buildConsultaFromForm();
    const err = validarConsulta(c);
    if(err){
      alert(err);
      return;
    }

    state.consultas.push(c);
    logAction('consulta','Guardó consulta '+c.folio);

    alert('Guardado');
  }catch(e){
    console.error(e);
    alert('Error al guardar');
  }
}

// ===============================
// IMPRESIÓN
// ===============================

function safePrintDoc(titulo, contenido){
  try{
    const w = window.open('', '_blank');
    w.document.write(`<html><body>${contenido}</body></html>`);
    w.document.close();
    w.print();
  }catch(e){
    alert('Error impresión');
  }
}

function imprimirNota(){
  const c = buildConsultaFromForm();
  safePrintDoc('Nota', `<h1>Nota</h1><p>${c.diagnostico}</p>`);
  logAction('print','Imprimió nota');
}
