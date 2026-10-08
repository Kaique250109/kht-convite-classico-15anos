/* ===============================================================
   KHT DIGITAL · CONVITE CLÁSSICO DE 15 ANOS
   PERSONALIZE APENAS O BLOCO "DADOS DO CONVITE" ABAIXO.
   Os dados iniciais são FICTÍCIOS, exclusivos desta demonstração.
   =============================================================== */

const CONVITE = {
  // ===== DADOS DO CONVITE: EDITE AQUI PARA CADA CLIENTE =====
  nome: "Isabela",
  data: "2027-05-22",               // formato ANO-MÊS-DIA
  horario: "19:00",                 // formato 24 horas
  fusoHorario: "-03:00",            // Brasil/SP
  local: "Parque Ibirapuera",
  endereco: "São Paulo, SP",        // digite o endereço completo do evento real
  whatsapp: "",                     // exemplo: "5511999999999" (somente dígitos)
  mensagemConfirmacao: "Olá! Confirmo minha presença nos 15 anos de {nome}, em {data}, às {horario}. 💜",
  demonstracao: true                // altere para false quando usar dados reais
};

// ===== NÃO PRECISA ALTERAR O CÓDIGO ABAIXO =====
(() => {
  "use strict";
  const names = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  function fill(field, value) {
    document.querySelectorAll(`[data-field="${field}"]`).forEach(el => { el.textContent = value; });
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(CONVITE.data);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(CONVITE.horario);
  if (!match || !timeMatch) {
    console.error("KHT Digital: confira o formato de data (AAAA-MM-DD) e horário (HH:MM).");
    return;
  }
  const y = Number(match[1]), m = Number(match[2]), d = Number(match[3]);
  const h = Number(timeMatch[1]), min = Number(timeMatch[2]);
  const displayDate = new Date(Date.UTC(y,m-1,d));
  if (displayDate.getUTCFullYear() !== y || displayDate.getUTCMonth() !== m-1 || displayDate.getUTCDate() !== d || h>23 || min>59) {
    console.error("KHT Digital: data ou horário inválido.");
    return;
  }
  const dayLabel = `${pad(d)} de ${months[m-1]} de ${y}`;
  const clockLabel = `${pad(h)}h${pad(min)}`;
  fill("nome", CONVITE.nome);
  fill("dia", pad(d));
  fill("mes", months[m-1].toUpperCase());
  fill("ano", String(y));
  fill("semana", names[displayDate.getUTCDay()].toUpperCase());
  fill("horario", clockLabel.toUpperCase());
  fill("local", CONVITE.local);
  fill("endereco", CONVITE.endereco.replace(/,\s*/g, " · "));
  document.title = `${CONVITE.nome} faz 15 anos | Convite`;

  const rsvpMessage = CONVITE.mensagemConfirmacao
    .replaceAll("{nome}", CONVITE.nome)
    .replaceAll("{data}", dayLabel)
    .replaceAll("{horario}", clockLabel);
  const digits = CONVITE.whatsapp.replace(/\D/g, "");
  const whatsappUrl = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(rsvpMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(rsvpMessage)}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CONVITE.local}, ${CONVITE.endereco}`)}`;
  const rsvp = document.querySelector("#rsvp-link");
  const maps = document.querySelector("#maps-link");
  rsvp.href = whatsappUrl;
  maps.href = mapsUrl;
  if (!digits) {
    rsvp.title = "Demonstração: abre o WhatsApp para escolher um contato e compartilhar a mensagem.";
  }
  const note = document.querySelector("#demo-notice");
  if (!CONVITE.demonstracao) note.hidden = true;

  const timeZoneMatch = /^([+-])(\d{2}):(\d{2})$/.exec(CONVITE.fusoHorario);
  const offset = timeZoneMatch ? Number(timeZoneMatch[2])*60+Number(timeZoneMatch[3]) : 180;
  const sign = timeZoneMatch && timeZoneMatch[1]==="+" ? 1 : -1;
  const eventTime = Date.UTC(y,m-1,d,h,min) - sign*offset*60*1000;
  const countdown = document.querySelector("#countdown-text");
  function updateCountdown() {
    const remain = Math.max(0,eventTime - Date.now());
    if (!remain) {
      countdown.textContent = "Chegou o grande dia! ✨";
      return;
    }
    const totalHours = Math.floor(remain / 3600000);
    const days = Math.floor(totalHours/24);
    const hours = totalHours % 24;
    const mins = Math.floor((remain % 3600000)/60000);
    countdown.textContent = `${days} ${days===1?"dia":"dias"} · ${pad(hours)}h · ${pad(mins)}min`;
  }
  updateCountdown();
  window.setInterval(updateCountdown, 60000);
})();
