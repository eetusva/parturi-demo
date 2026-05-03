<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 class="text-2xl md:text-3xl font-light uppercase tracking-wide text-gray-800 text-center sm:text-left">Hallintapaneeli</h1>
        <button v-if="user" @click="logout" class="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition">Kirjaudu ulos</button>
      </div>

      <!-- Login Form -->
      <div v-if="!user" class="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mt-20">
        <h2 class="text-2xl font-semibold mb-6 text-center text-gray-700">Kirjaudu sisään</h2>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Sähköposti</label>
            <input v-model="email" type="email" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Salasana</label>
            <input v-model="password" type="password" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
          </div>
          <p v-if="authError" class="text-red-500 text-sm">{{ authError }}</p>
          <button type="submit" :disabled="isLoggingIn" class="w-full bg-[#9c9e78] text-white py-2 rounded hover:bg-[#8a8c6a] transition disabled:opacity-50">
            {{ isLoggingIn ? 'Kirjaudutaan...' : 'Kirjaudu' }}
          </button>
        </form>
      </div>

      <!-- Admin Dashboard -->
      <div v-else class="space-y-8">
        
        <!-- Bookings Dashboard -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-4">
              <h2 class="text-xl font-semibold text-gray-800">Varaukset</h2>
              <div class="flex bg-gray-200 p-1 rounded-lg">
                <button @click="viewMode = 'calendar'" :class="viewMode === 'calendar' ? 'bg-white shadow text-gray-800' : 'text-gray-500'" class="px-3 py-1 rounded-md text-sm font-medium transition">Kalenteri</button>
                <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-500'" class="px-3 py-1 rounded-md text-sm font-medium transition">Lista</button>
              </div>
            </div>
            <div class="flex gap-2 w-full md:w-auto">
              <button @click="showAddBooking = !showAddBooking" class="flex-1 md:flex-none text-sm bg-[#9c9e78] text-white px-3 py-1 rounded hover:bg-[#8a8c6a]">
                {{ showAddBooking ? 'Peruuta' : '+ Lisää varaus' }}
              </button>
              <button @click="fetchBookings" class="text-sm bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Päivitä</button>
            </div>
          </div>

          <!-- Manual Booking Form -->
          <div v-if="showAddBooking" class="p-6 bg-gray-50 border-b border-gray-200">
            <h3 class="text-lg font-medium mb-4 text-gray-700">{{ editingBookingId ? 'Muokkaa varausta' : 'Lisää uusi varaus manuaalisesti' }}</h3>
            <form @submit.prevent="addManualBooking" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Päivämäärä</label>
                <input v-model="manualBooking.booking_date" type="date" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Kellonaika (esim. 10:00)</label>
                <input v-model="manualBooking.booking_time" type="time" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Palvelu</label>
                <select v-model="manualBooking.service" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
                  <option v-for="s in services" :key="'man-'+s.id" :value="s.name">{{ s.name }}</option>
                  <option value="Muu / Oma meno">Muu / Oma meno</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Asiakkaan nimi</label>
                <input v-model="manualBooking.customer_name" type="text" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" placeholder="Nimi" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Puhelin</label>
                <input v-model="manualBooking.phone" type="text" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" placeholder="Puhelin">
              </div>
              <button type="submit" :disabled="isSubmittingManual" class="w-full bg-[#9c9e78] text-white py-2 rounded hover:bg-[#8a8c6a] transition disabled:opacity-50">
                {{ isSubmittingManual ? 'Tallennetaan...' : 'Tallenna varaus' }}
              </button>
            </form>
          </div>
          
          <!-- Calendar View -->
          <div v-if="viewMode === 'calendar'" class="p-4 md:p-6 bg-white">
            <!-- Calendar Navigation -->
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-2">
                <button @click="prevWeek" class="p-2 hover:bg-gray-100 rounded-full transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <button @click="goToToday" class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition">Tänään</button>
                <button @click="nextWeek" class="p-2 hover:bg-gray-100 rounded-full transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
              </div>
              <h3 class="text-lg font-medium text-gray-700 capitalize">{{ currentMonthYearDisplay }}</h3>
            </div>

            <!-- Calendar Grid -->
            <div class="relative">
              <!-- Scroll Hint for Mobile -->
              <div class="md:hidden text-[10px] text-gray-400 mb-2 flex items-center justify-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                Pyyhkäise nähdäksesi koko viikon
              </div>
              
              <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-inner bg-gray-50">
                <div class="min-w-[1000px] bg-white">
                  <div class="grid grid-cols-[60px_repeat(7,1fr)]">
                    <!-- Empty corner -->
                    <div class="h-12 bg-gray-50 border-r border-b border-gray-200 sticky left-0 z-20"></div>
                    <!-- Days Headers -->
                    <div v-for="day in weekDays" :key="day.toString()" :class="isToday(day) ? 'bg-[#f8f9f0]' : 'bg-gray-50'" class="h-12 border-r border-b border-gray-200 flex flex-col items-center justify-center">
                      <span class="text-[10px] uppercase text-gray-500 font-bold tracking-tighter">{{ formatDayName(day) }}</span>
                      <span :class="isToday(day) ? 'text-[#9c9e78] font-bold' : 'text-gray-700'" class="text-sm">{{ day.getDate() }}.{{ day.getMonth() + 1 }}.</span>
                    </div>

                    <!-- Time Rows -->
                    <template v-for="hour in calendarHours" :key="hour">
                      <!-- Time column sticky -->
                      <div class="h-20 border-r border-b border-gray-100 text-[10px] text-gray-400 p-1 font-mono flex flex-col justify-between sticky left-0 bg-gray-50 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                        <span>{{ hour }}:00</span>
                      </div>
                      <div v-for="day in weekDays" :key="day.toString() + hour" class="h-20 border-r border-b border-gray-100 relative group hover:bg-gray-50/50">
                        <!-- Bookings for this day/hour -->
                        <template v-for="booking in getBookingsForDay(day)" :key="booking.id">
                          <div 
                            v-if="isBookingInHour(booking, hour)"
                            @click="selectedBooking = booking"
                            :style="getBookingStyle(booking)"
                            class="absolute left-1 right-1 z-10 p-1 rounded border border-[#8a8c6a] bg-[#9c9e78] text-white text-[10px] overflow-hidden cursor-pointer shadow-sm hover:brightness-95 transition-all"
                            :title="`${booking.customer_name} - ${booking.service}`"
                          >
                            <div class="font-bold truncate">{{ booking.booking_time }}</div>
                            <div class="truncate">{{ booking.customer_name }}</div>
                            <div class="truncate opacity-80">{{ booking.service }}</div>
                          </div>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bookings: Desktop Table -->
          <div v-if="viewMode === 'list'" class="hidden md:block overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 border-b">Päivä & Kello</th>
                  <th class="py-3 px-6 border-b">Asiakas</th>
                  <th class="py-3 px-6 border-b">Puhelin</th>
                  <th class="py-3 px-6 border-b">Palvelu</th>
                  <th class="py-3 px-6 border-b">Toiminnot</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr v-if="isLoading" class="border-b border-gray-200">
                  <td colspan="5" class="py-8 px-6 text-center text-gray-500">Ladataan varauksia...</td>
                </tr>
                <tr v-else-if="bookings.length === 0" class="border-b border-gray-200">
                  <td colspan="5" class="py-8 px-6 text-center text-gray-500">Ei tulevia varauksia.</td>
                </tr>
                <tr v-for="booking in bookings" :key="booking.id" class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" @click="selectedBooking = booking">
                  <td class="py-3 px-6 font-medium">{{ formatDate(booking.booking_date) }} klo {{ booking.booking_time }} ({{ booking.duration_minutes }} min)</td>
                  <td class="py-3 px-6">{{ booking.customer_name }}</td>
                  <td class="py-3 px-6">{{ booking.phone }}</td>
                  <td class="py-3 px-6">
                    <span class="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">{{ booking.service }}</span>
                  </td>
                  <td class="py-3 px-6">
                    <button @click.stop="deleteBooking(booking.id)" class="text-red-500 hover:text-red-700 font-medium">Peruuta</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bookings: Mobile Card List -->
          <div v-if="viewMode === 'list'" class="md:hidden divide-y divide-gray-100">
            <div v-if="isLoading" class="p-8 text-center text-gray-500">Ladataan varauksia...</div>
            <div v-else-if="bookings.length === 0" class="p-8 text-center text-gray-500">Ei tulevia varauksia.</div>
            <div v-for="booking in bookings" :key="'mob-'+booking.id" class="p-4 space-y-3 cursor-pointer hover:bg-gray-50" @click="selectedBooking = booking">
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-bold text-gray-800 text-lg">{{ formatDate(booking.booking_date) }} klo {{ booking.booking_time }}</div>
                  <div class="text-sm text-gray-500">{{ booking.duration_minutes }} min</div>
                </div>
                <span class="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-semibold uppercase">{{ booking.service }}</span>
              </div>
              <div class="flex flex-col text-gray-700">
                <span class="font-medium">{{ booking.customer_name }}</span>
                <span class="text-sm">{{ booking.phone }}</span>
              </div>
              <div class="pt-2">
                <button @click.stop="deleteBooking(booking.id)" class="w-full bg-red-50 text-red-600 py-2 rounded font-medium border border-red-100">Peruuta varaus</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Opening Hours Management -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden p-4 md:p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Aseta poikkeavat aukioloajat</h2>
          <form @submit.prevent="saveOpeningHours" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8">
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Päivämäärä</label>
              <input v-model="ohForm.date" type="date" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Avaus</label>
              <input v-model="ohForm.open_time" type="time" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" :disabled="ohForm.is_closed" required>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Sulku</label>
              <input v-model="ohForm.close_time" type="time" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" :disabled="ohForm.is_closed" required>
            </div>
            <div class="flex items-center mb-2 pb-1">
              <input v-model="ohForm.is_closed" type="checkbox" id="is_closed" class="mr-2 h-5 w-5">
              <label for="is_closed" class="text-sm font-medium text-gray-600">Suljettu kokonaan</label>
            </div>
            <button type="submit" class="w-full bg-[#9c9e78] text-white px-4 py-2 rounded hover:bg-[#8a8c6a] transition">Tallenna</button>
          </form>

          <h3 class="text-lg font-semibold text-gray-800 mb-3 border-t pt-4">Tulevat poikkeukselliset aukioloajat</h3>
          <!-- Opening Hours: Desktop Table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 border-b">Päivämäärä</th>
                  <th class="py-3 px-6 border-b">Tila</th>
                  <th class="py-3 px-6 border-b">Aika</th>
                  <th class="py-3 px-6 border-b">Toiminnot</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr v-if="isLoadingOH" class="border-b border-gray-200">
                  <td colspan="4" class="py-4 px-6 text-center text-gray-500">Ladataan aukioloaikoja...</td>
                </tr>
                <tr v-else-if="openingHours.length === 0" class="border-b border-gray-200">
                  <td colspan="4" class="py-4 px-6 text-center text-gray-500">Ei tulevia poikkeuksia.</td>
                </tr>
                <tr v-for="oh in openingHours" :key="oh.id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="py-3 px-6 font-medium">{{ formatDate(oh.date) }}</td>
                  <td class="py-3 px-6">
                    <span :class="oh.is_closed ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'" class="py-1 px-3 rounded-full text-xs">
                      {{ oh.is_closed ? 'SULJETTU' : 'AVOINNA' }}
                    </span>
                  </td>
                  <td class="py-3 px-6">{{ oh.is_closed ? '-' : `${oh.open_time} - ${oh.close_time}` }}</td>
                  <td class="py-3 px-6">
                    <button @click="deleteOpeningHour(oh.id)" class="text-red-500 hover:text-red-700 font-medium">Poista poikkeus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Opening Hours: Mobile Card List -->
          <div class="md:hidden divide-y divide-gray-100">
            <div v-if="isLoadingOH" class="p-4 text-center text-gray-500">Ladataan aukioloaikoja...</div>
            <div v-else-if="openingHours.length === 0" class="p-4 text-center text-gray-500 text-sm">Ei tulevia poikkeuksia.</div>
            <div v-for="oh in openingHours" :key="'mob-oh-'+oh.id" class="p-4 flex justify-between items-center">
              <div>
                <div class="font-bold text-gray-800">{{ formatDate(oh.date) }}</div>
                <div class="text-sm text-gray-500">
                  {{ oh.is_closed ? 'SULJETTU' : `${oh.open_time} - ${oh.close_time}` }}
                </div>
              </div>
              <button @click="deleteOpeningHour(oh.id)" class="text-red-500 p-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
          </div>
        </div>

        <!-- Service Management -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden p-4 md:p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Palveluiden hallinta</h2>
          <form @submit.prevent="saveService" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8 border-b pb-6">
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Palvelun nimi</label>
              <input v-model="serviceForm.name" type="text" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" placeholder="Esim. Miesten leikkaus" required>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Kesto (min)</label>
              <input v-model.number="serviceForm.duration_minutes" type="number" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none" required>
            </div>
            <div class="w-full">
              <label class="block text-sm font-medium text-gray-600 mb-1">Hinta (€)</label>
              <input v-model.number="serviceForm.price" type="number" step="0.01" class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#9c9e78] outline-none">
            </div>
            <div class="flex flex-col sm:flex-row gap-2">
              <button type="submit" class="w-full bg-[#9c9e78] text-white px-4 py-2 rounded hover:bg-[#8a8c6a] transition">
                {{ editingServiceId ? 'Tallenna' : 'Lisää palvelu' }}
              </button>
              <button v-if="editingServiceId" @click="cancelEdit" type="button" class="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"> Peruuta </button>
            </div>
          </form>

          <!-- Services: Desktop Table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 border-b">Nimi</th>
                  <th class="py-3 px-6 border-b">Kesto</th>
                  <th class="py-3 px-6 border-b">Hinta</th>
                  <th class="py-3 px-6 border-b">Toiminnot</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr v-if="isLoadingServices" class="border-b border-gray-200">
                  <td colspan="4" class="py-4 px-6 text-center text-gray-500">Ladataan palveluita...</td>
                </tr>
                <tr v-for="s in services" :key="s.id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="py-3 px-6 font-medium">{{ s.name }}</td>
                  <td class="py-3 px-6">{{ s.duration_minutes }} min</td>
                  <td class="py-3 px-6">{{ s.price }} €</td>
                  <td class="py-3 px-6 flex gap-3">
                    <button @click="editService(s)" class="text-blue-500 hover:text-blue-700 font-medium">Muokkaa</button>
                    <button @click="deleteService(s.id)" class="text-red-500 hover:text-red-700 font-medium">Poista</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Services: Mobile Card List -->
          <div class="md:hidden divide-y divide-gray-100">
            <div v-if="isLoadingServices" class="p-4 text-center text-gray-500">Ladataan palveluita...</div>
            <div v-for="s in services" :key="'mob-s-'+s.id" class="p-4 flex justify-between items-center">
              <div>
                <div class="font-bold text-gray-800">{{ s.name }}</div>
                <div class="text-sm text-gray-500">{{ s.duration_minutes }} min &bull; {{ s.price }} €</div>
              </div>
              <div class="flex gap-2">
                <button @click="editService(s)" class="text-blue-500 p-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                <button @click="deleteService(s.id)" class="text-red-500 p-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Booking Details Modal -->
    <div v-if="selectedBooking" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-[#9c9e78] text-white">
          <h3 class="text-xl font-semibold">Varauksen tiedot</h3>
          <button @click="selectedBooking = null" class="text-white/80 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>
        <div class="p-6 space-y-4 text-gray-700">
          <div class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-500 uppercase text-xs">Asiakas</span>
            <span class="font-bold text-gray-900">{{ selectedBooking.customer_name }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-500 uppercase text-xs">Puhelin</span>
            <span class="text-gray-900">{{ selectedBooking.phone || '-' }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-500 uppercase text-xs">Palvelu</span>
            <span class="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">{{ selectedBooking.service }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-500 uppercase text-xs">Aika</span>
            <span class="text-gray-900 font-bold">{{ formatDate(selectedBooking.booking_date) }} klo {{ selectedBooking.booking_time }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-500 uppercase text-xs">Kesto</span>
            <span class="text-gray-900">{{ selectedBooking.duration_minutes }} min</span>
          </div>
        </div>
        <div class="p-6 bg-gray-50 flex gap-3">
          <button @click="startEditBooking(selectedBooking)" class="flex-1 bg-white border border-gray-300 py-2 rounded font-medium hover:bg-gray-100 transition flex justify-center items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Muokkaa
          </button>
          <button @click="deleteBooking(selectedBooking.id); selectedBooking = null" class="flex-1 bg-red-50 text-red-600 border border-red-100 py-2 rounded font-medium hover:bg-red-100 transition flex justify-center items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Poista
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const isLoggingIn = ref(false)
const authError = ref('')

const bookings = ref([])
const openingHours = ref([])
const services = ref([])
const isLoading = ref(false)
const isLoadingOH = ref(false)
const isLoadingServices = ref(false)
const showAddBooking = ref(false)
const isSubmittingManual = ref(false)
const viewMode = ref('calendar')
const selectedDate = ref(new Date())
const selectedBooking = ref(null)
const editingBookingId = ref(null)

const calendarHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

const weekDays = computed(() => {
  const start = new Date(selectedDate.value)
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1) // Maanantai
  const monday = new Date(start.setDate(diff))
  monday.setHours(0,0,0,0)
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
})

const currentMonthYearDisplay = computed(() => {
  return selectedDate.value.toLocaleDateString('fi-FI', { month: 'long', year: 'numeric' })
})

const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear()
}

const formatDayName = (date) => {
  return date.toLocaleDateString('fi-FI', { weekday: 'short' })
}

const prevWeek = () => {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() - 7)
  selectedDate.value = d
}

const nextWeek = () => {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() + 7)
  selectedDate.value = d
}

const goToToday = () => {
  selectedDate.value = new Date()
}

const getBookingsForDay = (date) => {
  const dateStr = date.toISOString().split('T')[0]
  return bookings.value.filter(b => b.booking_date === dateStr)
}

const isBookingInHour = (booking, hour) => {
  const [bHour] = booking.booking_time.split(':').map(Number)
  return bHour === hour
}

const getBookingStyle = (booking) => {
  const [_, minutes] = booking.booking_time.split(':').map(Number)
  const top = (minutes / 60) * 80
  const height = (booking.duration_minutes / 60) * 80
  return {
    top: `${top}px`,
    height: `${height}px`
  }
}

const manualBooking = ref({
  booking_date: '',
  booking_time: '',
  service: '',
  customer_name: '',
  phone: ''
})

// Forms
const ohForm = ref({
  date: '',
  open_time: '09:00',
  close_time: '17:00',
  is_closed: false
})

const serviceForm = ref({
  name: '',
  duration_minutes: 30,
  price: 0
})
const editingServiceId = ref(null)

const fetchServices = async () => {
  if (!user.value) return
  isLoadingServices.value = true
  const { data, error } = await supabase.from('services').select('*').order('name')
  if (data) services.value = data
  isLoadingServices.value = false
}

const editService = (service) => {
  editingServiceId.value = service.id
  serviceForm.value = { 
    name: service.name,
    duration_minutes: service.duration_minutes,
    price: service.price
  }
}

const cancelEdit = () => {
  editingServiceId.value = null
  serviceForm.value = { name: '', duration_minutes: 30, price: 0 }
}

const saveService = async () => {
  if (editingServiceId.value) {
    const { error } = await supabase
      .from('services')
      .update(serviceForm.value)
      .eq('id', editingServiceId.value)
    if (error) {
      alert('Virhe päivitettäessä: ' + error.message)
    } else {
      cancelEdit()
      fetchServices()
    }
  } else {
    const { error } = await supabase.from('services').insert([serviceForm.value])
    if (error) {
      alert('Virhe lisättäessä palvelua: ' + error.message)
    } else {
      serviceForm.value = { name: '', duration_minutes: 30, price: 0 }
      fetchServices()
    }
  }
}

const deleteService = async (id) => {
  if (confirm('Haluatko varmasti poistaa tämän palvelun?')) {
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (!error) fetchServices()
  }
}

const addManualBooking = async () => {
  isSubmittingManual.value = true
  try {
    if (editingBookingId.value) {
      // Muokkaus: suora Supabase-päivitys
      const { error } = await supabase
        .from('bookings')
        .update(manualBooking.value)
        .eq('id', editingBookingId.value)
      
      if (error) throw error
      alert('Varaus päivitetty!')
    } else {
      // Uusi varaus: API-reitin kautta (sisältää validointia)
      await $fetch('/api/book', {
        method: 'POST',
        body: manualBooking.value
      })
      alert('Varaus lisätty onnistuneesti!')
    }
    
    showAddBooking.value = false
    editingBookingId.value = null
    manualBooking.value = {
      booking_date: '',
      booking_time: '',
      service: services.value[0]?.name || '',
      customer_name: '',
      phone: ''
    }
    fetchBookings()
  } catch (error) {
    alert('Virhe: ' + (error.data?.statusMessage || error.message))
  } finally {
    isSubmittingManual.value = false
  }
}

const startEditBooking = (booking) => {
  selectedBooking.value = null
  editingBookingId.value = booking.id
  manualBooking.value = {
    booking_date: booking.booking_date,
    booking_time: booking.booking_time,
    service: booking.service,
    customer_name: booking.customer_name,
    phone: booking.phone
  }
  showAddBooking.value = true
  // Vieritä ylös lomakkeeseen
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const login = async () => {
  isLoggingIn.value = true
  authError.value = ''
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  isLoggingIn.value = false
  if (error) {
    authError.value = error.message
  }
}

const logout = async () => {
  await supabase.auth.signOut()
}

const fetchBookings = async () => {
  if (!user.value) return
  
  isLoading.value = true
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('booking_date', new Date().toISOString().split('T')[0])
    .order('booking_date', { ascending: true })
    .order('booking_time', { ascending: true })
    
  if (data) {
    bookings.value = data
  } else if (error) {
    console.error(error)
  }
  isLoading.value = false
}

const fetchOpeningHours = async () => {
  if (!user.value) return
  
  isLoadingOH.value = true
  const { data, error } = await supabase
    .from('opening_hours')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    
  if (data) {
    openingHours.value = data
  } else if (error) {
    console.error(error)
  }
  isLoadingOH.value = false
}

const deleteBooking = async (id) => {
  if (confirm('Haluatko varmasti perua tämän varauksen?')) {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (!error) {
      bookings.value = bookings.value.filter(b => b.id !== id)
    } else {
      alert('Virhe poistettaessa: ' + error.message)
    }
  }
}

const deleteOpeningHour = async (id) => {
  if (confirm('Haluatko poistaa tämän poikkeuksen, jolloin päivä palaa takaisin oletusaukioloaikoihin?')) {
    const { error } = await supabase.from('opening_hours').delete().eq('id', id)
    if (!error) {
      openingHours.value = openingHours.value.filter(oh => oh.id !== id)
    } else {
      alert('Virhe poistettaessa: ' + error.message)
    }
  }
}

const saveOpeningHours = async () => {
  const { error } = await supabase
    .from('opening_hours')
    .upsert({
      date: ohForm.value.date,
      open_time: ohForm.value.is_closed ? null : ohForm.value.open_time,
      close_time: ohForm.value.is_closed ? null : ohForm.value.close_time,
      is_closed: ohForm.value.is_closed
    }, { onConflict: 'date' })
  
  if (error) {
    alert('Virhe tallennettaessa aukioloaikoja: ' + error.message)
  } else {
    alert('Aukioloajat tallennettu onnistuneesti päivälle ' + ohForm.value.date)
    ohForm.value.date = ''
    fetchOpeningHours()
  }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

// Hae data kun komponentti ladataan tai käyttäjä kirjautuu
onMounted(() => {
  if (user.value) {
    fetchBookings()
    fetchOpeningHours()
    fetchServices()
  }
})

watch(user, (newUser) => {
  if (newUser) {
    fetchBookings()
    fetchOpeningHours()
    fetchServices()
  }
})

useHead({
  title: 'Hallintapaneeli - Launialan Parturi-Kampaamo'
})
</script>