import React from 'react'
import { mount } from 'enzyme'
import { App } from './App'
import { Blog } from '../Blog'

describe.only('<App />', () => {
	let app

	describe('when user is not logged', () => {
		beforeEach(() => {
			app = mount(<App />)
		})

		it('does not display any blogs if user is not logged in', () => {
			app.update()
			expect(app.find(Blog).length).toEqual(0)
		})
	})

	describe('when user is logged in', () => {
		beforeEach(() => {
			localStorage.setItem('user', '{ "id": 2 }')
			app = mount(<App />)
		})

		it('displays blogs', () => {
			app.update()
			expect(app.find(Blog).length).toBeGreaterThan(0)
		})
	})
})
