<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Header -->
    <header class="bg-[#9c9e78] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-3xl font-light tracking-widest uppercase">Launialan Parturi-Kampaamo</h1>
        <div class="hidden md:flex space-x-6 items-center text-sm font-medium tracking-wide uppercase">
          <a href="#" class="hover:text-gray-200 border-b-2 border-transparent hover:border-white pb-1 transition">Etusivu</a>
          <button @click="isBookingOpen = true" class="hover:text-gray-200 border-b-2 border-transparent hover:border-white pb-1 transition">Ajanvaraus</button>
          <a href="#palvelut" class="hover:text-gray-200 border-b-2 border-transparent hover:border-white pb-1 transition">Palvelut</a>
          <a href="#yhteystiedot" class="hover:text-gray-200 border-b-2 border-transparent hover:border-white pb-1 transition">Yhteystiedot</a>
          
          <!-- Social Icons Placeholder -->
          <div class="flex space-x-4 pl-4 border-l border-[#8a8c6a]">
            <a href="#" class="hover:text-gray-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" class="hover:text-gray-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Image -->
    <main>
      <section class="w-full">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Parturi-kampaamo sisältä" class="w-full h-[400px] md:h-[600px] object-cover">
      </section>

      <!-- Content Layout -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 items-start">
          
          <!-- Left Column (Text) -->
          <div class="lg:col-span-2">
            <h2 class="text-3xl md:text-4xl font-light text-gray-800 uppercase leading-tight mb-8">
              Tervetuloa palveltavaksi<br/>
              <span class="font-normal text-gray-900">Launialan Parturi-Kampaamo</span>
            </h2>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Launialan Parturi-Kampaamo Marjaana Orpana tarjoaa ammattitaitoista ja ystävällistä palvelua koko perheelle. Olemme palvelleet asiakkaitamme Mikkelissä suurella sydämellä ja vankalla ammattitaidolla.
              </p>
              <p>
                Vuosikymmenten kokemus näkyy varmuutena, mutta tunnelma on aina rento ja lämmin. Meillä hiuksia hoidetaan taidolla, asiakasta kuunnellen ja hyvällä fiiliksellä.
              </p>
              <p class="font-medium text-gray-800">
                Tule sellaisena kuin olet – me huolehdimme lopusta.
              </p>
            </div>
          </div>

          <!-- Right Column (Booking) -->
          <div class="bg-gray-50/50 p-8 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col justify-center items-center">
            <button @click="isBookingOpen = true" class="w-full bg-[#9c9e78] text-white py-4 px-8 text-lg uppercase tracking-widest hover:bg-[#8a8c6a] transition shadow-md mb-8">
              Ajanvaraus
            </button>
            <div class="text-gray-800">
              <p class="text-lg mb-2">Ajanvaraus puhelimitse</p>
              <p class="text-2xl font-bold">015 336638</p>
            </div>
          </div>

        </div>
      </section>

      <!-- Services Section -->
      <section id="palvelut" class="bg-gray-50 py-24 border-t border-gray-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-light uppercase tracking-widest text-gray-800 mb-4">Palvelut & Hinnasto</h2>
            <div class="w-20 h-1 bg-[#9c9e78] mx-auto"></div>
          </div>
          
          <div v-if="services.length === 0" class="text-center text-gray-500 italic">
            Ladataan palveluita...
          </div>
          
          <div v-else class="space-y-6">
            <div v-for="s in services" :key="'list-'+s.id" class="group flex justify-between items-end border-b border-gray-200 pb-4 hover:border-[#9c9e78] transition-colors">
              <div class="pr-4">
                <h4 class="text-xl font-medium text-gray-800 group-hover:text-[#9c9e78] transition-colors">{{ s.name }}</h4>
                <p class="text-sm text-gray-500 mt-1 uppercase tracking-tighter">{{ s.duration_minutes }} min</p>
                <p v-if="s.description" class="text-sm text-gray-400 mt-2 italic">{{ s.description }}</p>
              </div>
              <div class="text-2xl font-light text-[#9c9e78] whitespace-nowrap">
                {{ s.price }} €
              </div>
            </div>
          </div>
          
          <div class="mt-16 text-center">
            <p class="text-gray-400 italic text-sm mb-8">Hinnat sisältävät alv 25,5%. Lopullinen hinta määräytyy työn ja käytettyjen aineiden mukaan.</p>
            <button @click="isBookingOpen = true" class="inline-block border-2 border-[#9c9e78] text-[#9c9e78] px-8 py-3 uppercase tracking-widest font-medium hover:bg-[#9c9e78] hover:text-white transition">
              Varaa aika tästä
            </button>
          </div>
        </div>
      </section>

      <!-- Map & Additional Info Section -->
      <section id="yhteystiedot" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-light uppercase mb-6">Yhteystiedot</h3>
            <p class="text-lg text-gray-800 font-medium mb-2">Launialan Parturi-Kampaamo Marjaana Orpana</p>
            <p class="text-gray-600 mb-6">Keltasirkunkatu 11<br/>50190 Mikkeli</p>
            
            <h4 class="text-xl font-light uppercase mb-4">Aukioloajat</h4>
            <ul class="text-gray-600 space-y-2">
              <li>Ma - Pe: 9.00 - 17.00</li>
              <li>Lauantai: Sopimuksen mukaan</li>
              <li>Sunnuntai: Suljettu</li>
            </ul>
          </div>
          <div class="h-80 bg-gray-200 shadow-inner">
            <iframe 
              width="100%" 
              height="100%" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              src="https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=Keltasirkunkatu%2011,%2050190%20Mikkeli+(Launialan%20Parturi-Kampaamo)&t=&z=15&ie=UTF8&iwloc=B&output=embed">
            </iframe>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-gray-100 py-8 text-center border-t border-gray-200">
      <p class="text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }} Launialan Parturi-Kampaamo Marjaana Orpana</p>
    </footer>

    <!-- Booking Modal (Kalenteri) -->
    <div v-if="isBookingOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div class="bg-white p-8 max-w-3xl w-full relative text-gray-800 shadow-2xl my-8">
        <button @click="isBookingOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h3 class="text-2xl font-light uppercase mb-6 border-b pb-4 text-center">Varaa aika</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Vasen: Palvelu ja Kalenteri -->
          <div>
            <div class="mb-6">
              <label class="block text-sm uppercase tracking-wide text-gray-600 mb-2">1. Valitse palvelu</label>
              <select v-model="bookingData.service" class="block w-full border-gray-300 bg-gray-50 border p-3 focus:border-[#9c9e78] focus:ring-[#9c9e78] outline-none">
                <option v-for="s in services" :key="s.id" :value="s.name">
                  {{ s.name }} ({{ s.duration_minutes }} min) - {{ s.price }}€
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm uppercase tracking-wide text-gray-600 mb-2">2. Valitse päivä</label>
              <div class="border border-gray-200 rounded bg-white p-4">
                <!-- Kalenterin otsikko -->
                <div class="flex justify-between items-center mb-4">
                  <button @click="prevMonth" class="text-gray-500 hover:text-[#9c9e78]"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                  <span class="font-medium text-lg uppercase tracking-wider">{{ currentMonthName }} {{ currentYear }}</span>
                  <button @click="nextMonth" class="text-gray-500 hover:text-[#9c9e78]"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                </div>
                <!-- Viikonpäivät -->
                <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium mb-2">
                  <div>Ma</div><div>Ti</div><div>Ke</div><div>To</div><div>Pe</div><div>La</div><div>Su</div>
                </div>
                <!-- Päivät -->
                <div class="grid grid-cols-7 gap-1 text-center">
                  <div v-for="empty in blankDays" :key="'empty'+empty" class="h-10"></div>
                  <button 
                    v-for="day in daysInMonth" 
                    :key="day" 
                    @click="selectDate(day)"
                    :disabled="isPastDate(day)"
                    :class="[
                      'h-10 w-10 mx-auto rounded-full flex items-center justify-center transition-colors',
                      isPastDate(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer',
                      isSelectedDate(day) ? 'bg-[#9c9e78] text-white hover:bg-[#8a8c6a]' : '',
                      isToday(day) && !isSelectedDate(day) ? 'border border-[#9c9e78] text-[#9c9e78]' : ''
                    ]"
                  >
                    {{ day }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Oikea: Kellonaika ja Yhteystiedot -->
          <div>
            <div v-if="!bookingData.booking_date" class="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center border-2 border-dashed border-gray-200 rounded">
              <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p>Valitse ensin päivämäärä vasemmalta nähdäksesi vapaat ajat.</p>
            </div>
            
            <div v-else class="space-y-6">
              <div>
                <label class="block text-sm uppercase tracking-wide text-gray-600 mb-2">3. Valitse aika ({{ formattedSelectedDate }})</label>
                <div v-if="isLoadingTimes" class="text-gray-500 text-sm py-4">Tarkistetaan vapaita aikoja...</div>
                <div v-else-if="availableTimes.length === 0" class="text-gray-500 text-sm py-4">Ei vapaita aikoja valitulle päivälle ja palvelulle.</div>
                <div v-else class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="time in allTimes" 
                    :key="time"
                    @click="bookingData.booking_time = time"
                    :disabled="!availableTimes.includes(time)"
                    :class="[
                      'py-2 text-sm rounded border transition-colors',
                      !availableTimes.includes(time) ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' :
                      bookingData.booking_time === time 
                        ? 'bg-[#9c9e78] border-[#9c9e78] text-white' 
                        : 'bg-white border-gray-300 hover:border-[#9c9e78] text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>

              <div v-if="bookingData.booking_time" class="space-y-4 pt-4 border-t border-gray-100">
                <label class="block text-sm uppercase tracking-wide text-gray-600 mb-1">4. Täytä tietosi</label>
                <div>
                  <input v-model="bookingData.customer_name" type="text" placeholder="Nimi" class="block w-full border-gray-300 bg-gray-50 border p-3 focus:border-[#9c9e78] focus:ring-[#9c9e78] outline-none" required>
                </div>
                <div>
                  <input v-model="bookingData.phone" type="tel" placeholder="Puhelinnumero" class="block w-full border-gray-300 bg-gray-50 border p-3 focus:border-[#9c9e78] focus:ring-[#9c9e78] outline-none" required>
                </div>
                <button @click="submitBooking" :disabled="isLoading || !isFormValid" class="w-full flex justify-center py-4 px-4 text-base font-bold text-white bg-[#9c9e78] hover:bg-[#8a8c6a] transition mt-6 uppercase tracking-widest disabled:opacity-50">
                  {{ isLoading ? 'Tallennetaan...' : 'Vahvista varaus' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const isBookingOpen = ref(false)
const supabase = useSupabaseClient()

// Kalenterilogiikka
const currentDate = ref(new Date())
const today = new Date()

const bookingData = ref({
  service: 'Hiustenleikkaus',
  booking_date: '',
  booking_time: '',
  customer_name: '',
  phone: ''
})

const allTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
const availableTimes = ref([])
const services = ref([])
const isLoadingTimes = ref(false)

const fetchServices = async () => {
  const { data } = await supabase.from('services').select('*').order('name')
  if (data) {
    services.value = data
    if (data.length > 0) {
      bookingData.value.service = data[0].name
    }
  }
}

onMounted(() => {
  fetchServices()
})

const fetchAvailableTimes = async (date) => {
  if (!date) return
  isLoadingTimes.value = true
  try {
    const res = await $fetch(`/api/availability?date=${date}&service=${encodeURIComponent(bookingData.value.service)}`)
    availableTimes.value = res.availableTimes || []
  } catch (e) {
    availableTimes.value = []
  }
  isLoadingTimes.value = false
}

watch(() => bookingData.value.service, () => {
  if (bookingData.value.booking_date) {
    fetchAvailableTimes(bookingData.value.booking_date)
    bookingData.value.booking_time = ''
  }
})

// Laske kalenterin tiedot
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const kuukaudet = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu']
const currentMonthName = computed(() => kuukaudet[currentMonth.value])

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const blankDays = computed(() => {
  let firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  // JavaScriptissä sunnuntai on 0, muutetaan viikko alkamaan maanantaista
  firstDay = firstDay === 0 ? 6 : firstDay - 1
  return firstDay
})

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const isPastDate = (day) => {
  const dateToCheck = new Date(currentYear.value, currentMonth.value, day)
  // Sallitaan kuluva päivä
  today.setHours(0, 0, 0, 0)
  return dateToCheck < today
}

const isToday = (day) => {
  return day === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear()
}

const selectDate = (day) => {
  const monthStr = String(currentMonth.value + 1).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')
  const newDate = `${currentYear.value}-${monthStr}-${dayStr}`
  bookingData.value.booking_date = newDate
  bookingData.value.booking_time = '' // Nollaa aika kun päivä vaihtuu
  fetchAvailableTimes(newDate)
}

const isSelectedDate = (day) => {
  if (!bookingData.value.booking_date) return false
  const [y, m, d] = bookingData.value.booking_date.split('-').map(Number)
  return day === d && currentMonth.value === m - 1 && currentYear.value === y
}

const formattedSelectedDate = computed(() => {
  if (!bookingData.value.booking_date) return ''
  const [y, m, d] = bookingData.value.booking_date.split('-')
  return `${d}.${m}.${y}`
})

const isFormValid = computed(() => {
  return bookingData.value.booking_date && 
         bookingData.value.booking_time && 
         bookingData.value.customer_name && 
         bookingData.value.phone
})

const isLoading = ref(false)

const submitBooking = async () => {
  if (!isFormValid.value) return
  isLoading.value = true
  
  try {
    const response = await $fetch('/api/book', {
      method: 'POST',
      body: bookingData.value
    })
    
    isBookingOpen.value = false
    if (typeof window !== 'undefined') {
      window.alert('Kiitos! Aikasi on varattu onnistuneesti ja yrittäjälle lähetettiin ilmoitus.')
    }
    // Nollaa lomake ja sulje kalenteri
    bookingData.value = {
      service: 'Hiustenleikkaus',
      booking_date: '',
      booking_time: '',
      customer_name: '',
      phone: ''
    }
    availableTimes.value = []
  } catch (error) {
    console.error('Error booking:', error)
    if (typeof window !== 'undefined') {
      window.alert('Varauksessa tapahtui virhe. Varmista, että olet luonut bookings-taulun Supabaseen!')
    }
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Launialan Parturi-Kampaamo Marjaana Orpana',
  meta: [
    { name: 'description', content: 'Launialan Parturi-Kampaamo Marjaana Orpana - Ammattitaitoista parturi-kampaamopalvelua Mikkelissä.' }
  ]
})
</script>