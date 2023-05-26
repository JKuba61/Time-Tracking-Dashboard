const settingBtns = document.querySelectorAll('.settingBtn')
const hours = document.querySelectorAll('.data__hours')
const previousHours = document.querySelectorAll('.data__previous')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal__closeBtn')
const moreDataBtn = document.querySelectorAll('.data__btn')
const modalTitle = document.querySelector('.modal__title')
const modalCard = document.querySelector('.modal__card')
const modalCurrentDay = document.querySelector('.modal__current__day')
const modalCurrentWeek = document.querySelector('.modal__current__week')
const modalCurrentMonth = document.querySelector('.modal__current__month')
const modalPreviousDay = document.querySelector('.modal__previous__day')
const modalPreviousWeek = document.querySelector('.modal__previous__week')
const modalPreviousMonth = document.querySelector('.modal__previous__month')

let userData

const populateDataFields = time => {
	for (let i = 0; i < hours.length; i++) {
		let setting = 'n/a'
		if (time === 'weekly') {
			setting = 'Last Week'
		}
		if (time === 'daily') {
			setting = 'Yesterday'
		}
		if (time === 'monthly') {
			setting = 'Last Month'
		}
		hours[i].innerHTML = `${userData[i].timeframes[time].current}hrs`
		previousHours[i].innerHTML = `${setting} - ${userData[i].timeframes[time].previous}hrs`
	}
}

const fetchData = async () => {
	const response = await fetch('./data.json')
	const data = await response.json()
	userData = data
	populateDataFields('weekly')
	console.log(userData)
}

settingBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		settingBtns.forEach(btn => {
			btn.classList.remove('active')
		})
		btn.classList.add('active')
		const timeframe = btn.dataset.timeframe
		populateDataFields(timeframe)
	})
})
modalCloseBtn.addEventListener('click', () => {
	modal.close()
})
moreDataBtn.forEach(btn => {
	btn.addEventListener('click', e => {
		userData.forEach(type => {
			if (type.title === btn.dataset.type) {
				modalTitle.innerHTML = type.title
				modalCurrentDay.innerHTML = type.timeframes.daily.current + 'hrs'
				modalCurrentWeek.innerHTML = type.timeframes.weekly.current + 'hrs'
				modalCurrentMonth.innerHTML = type.timeframes.monthly.current + 'hrs'
				modalPreviousDay.innerHTML = type.timeframes.daily.previous + 'hrs'
				modalPreviousWeek.innerHTML = type.timeframes.weekly.previous + 'hrs'
				modalPreviousMonth.innerHTML = type.timeframes.monthly.previous + 'hrs'
			}
		})
		modal.showModal()
	})
})
fetchData()
