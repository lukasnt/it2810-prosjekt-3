import React from 'react';
import { act, render, wait } from '@testing-library/react';
import {Route, MemoryRouter} from 'react-router-dom';
import fetch from 'jest-fetch-mock';
import MoviePage from './moviepage';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';


describe('Snapshot test suite for single movie page', () => {

    let component : any = null;

    const {act} = renderer;

    beforeAll(async () => {
        fetch.resetMocks();

        fetch.mockResponseOnce(JSON.stringify({
            primaryTitle: 'Movie',
            startYear: '2020',
            runtimeMinutes: '60',
            genres: 'Action,Comedy',
            posterPath: '../../res/mock_image.jpg',
            voteAverage: '8.6',
            voteCount: '10',
            overview: 'Overview'
        }))

        await act(async () => {
            component = renderer.create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/movie/01']}>
                        <Route path='/movie/:tconst' >
                            <MoviePage />
                        </Route>
                    </MemoryRouter>
                </Provider>
            );
        })

        // await wait(() => expect(fetch).toHaveBeenCalled())

    })
    

    it('renders single movie page', () => {
        let tree : any = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})


describe('Test suite for single movie page', () => {

    let wrapper : any = null;

    beforeEach(async () => {
        fetch.resetMocks();

        fetch.mockResponseOnce(JSON.stringify({
            primaryTitle: 'Movie',
            startYear: '2020',
            runtimeMinutes: '60',
            genres: 'Action,Comedy',
            posterPath: '../../res/mock_image.jpg',
            voteAverage: '8.6',
            voteCount: '10',
            overview: 'Overview'
        }))

        await act(async () => {
            wrapper = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/movie/01']}>
                    <Route path='/movie/:tconst' >
                    <MoviePage />
                    </Route>
                </MemoryRouter>
            </Provider>
            )
        })

        // await wait(() => expect(fetch).toHaveBeenCalled())
    });

    afterAll(() => {
        wrapper = null;
    })

  
    it('Expect one call to fetch()', () => {
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    
    it('Test that title and year shows correct data', () => {
        expect(wrapper.getByTestId('movietitle').innerHTML === 'Movie (2020)').toBeTruthy()
    })
    
    it('Test that genres shows correct data', () => {
        expect(wrapper.getByTestId('genres').innerHTML.includes('Action,Comedy')).toBeTruthy()
    })

    it('Test that overview shows correct data', () => {
        expect(wrapper.getByTestId('overview').innerHTML.includes('Overview')).toBeTruthy()
    })
  
})