const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event svg"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventFile = document.querySelector('.fancy-file'),
  addEventSubmit = document.querySelector(".add-event-btn "),
  submitFomulario = document.querySelector('#formulario');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();


const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const eventsArr = [];
getEvents();

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //comprobar si el evento está presente ese día
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//Función para agregar mes y año en los botones anterior y siguiente
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//funcion para agregar active el dia
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //elimina active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //Si hace clic en la fecha anterior o la fecha siguiente, cambie a ese mes
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //Agregar activo al día en que se hizo clic después del mes es cambio
        setTimeout(() => {
          //Agregar active donde no hay fecha anterior o próxima
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //Agregar activo al día en que se hizo clic después de que se modifique el mes
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//Función obtener día activo nombre del día y fecha y actualizar día del evento fecha del evento
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  let daySpanish = {
    'Sun': 'Dom',
      'Mon': 'Lun',
      'Tue': 'Mar',
      'Wed': 'Mie',
      'Thu': 'Jue',
      'Fri': 'Vie',
      'Sat': 'Sab'
  };
  
  let claves = Object.keys(daySpanish); 
  for(let i=0; i< claves.length; i++){
    let clave = claves[i];
    if(clave === dayName){
        eventDay.innerHTML = daySpanish[clave];
    }
  }
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//Función de actualización de eventos cuando un día está activo
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No hay eventos por mostrar</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//Permite 50 caracteres en la descripcion del evento
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 400);
});



addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});



//Agrega un evento al arreglo eventsArr
submitFomulario.addEventListener("click", (e) => {
  e.preventDefault();
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  if (eventTitle === "" || eventTimeFrom === "") {
    alert("Por favor llena todos los campos");
    return;
  }

  //Verifica lahora en formato de 24 horas
  const timeFromArr = eventTimeFrom.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59
  ) {
    alert("Formato de hora no válido");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);

  //Verifica si el evento ya se agregó
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Evento agregado");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  updateEvents(activeDay);
  //seleccione el día activo y agregue la clase de evento si no se agrega
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//función para eliminar evento cuando se hace clic en el evento
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("¿Esta seguro de eliminar este evento?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //Si no quedan eventos en un día, elimine ese día de eventsArr.
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //eliminar clase de evento del día
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//Funcion para agregar los eventos al localstorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function para obtener los eventos guardado en el localstorage
function getEvents() {
  //verifique si los eventos ya están guardados en el almacenamiento local y luego devuelva el evento
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //Convertir la hora a formato de 24 horas
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}


const create = str => document.createElement(str);
const files = document.querySelectorAll('.fancy-file');
Array.from(files).forEach(
    f => {
        const label = create('label');
        const span_text = create('span');
        const span_name =create('span');
        const span_button = create('span');

        label.htmlFor = f.id;

        span_text.className = 'fancy-file__fancy-file-name';
        span_button.className = 'fancy-file__fancy-file-button';

        span_name.innerHTML = f.dataset.empty || 'Ningun archivo seleccionado';
        span_button.innerHTML = f.dataset.button || 'Buscar';

        label.appendChild(span_text);
        label.appendChild(span_button);
        span_text.appendChild(span_name);
        f.parentNode.appendChild(label);

        span_name.style.width = (span_text.clientWidth - 20)+'px';

        f.addEventListener('change', e => {
            if( f.files.length == 0 ){
                span_name.innerHTML = f.dataset.empty ||'Ningún archivo seleccionado';
            }else if( f.files.length > 1 ){
                span_name.innerHTML = f.files.length + ' archivos seleccionados';
            }else{
                span_name.innerHTML = f.files[0].name;
            }
        } );   
    }
);