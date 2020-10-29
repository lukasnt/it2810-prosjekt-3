import React from 'react';
import { act, render} from '@testing-library/react';
import {Route, MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import MovieCard from './moviecard';
import MoviePage from './moviepage'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';


describe('Snapshot test suite for movie cards', () => {
    let component : any = null;

    const {act} = renderer;

    beforeAll(async () => {

        await act(async () => {
            component = renderer.create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path='/movie/:tconst' >
                            <MoviePage />
                        </Route>
                        <Route path='/' >
                            <MovieCard 
                                tconst='01'
                                title='Movie'
                                imageUrl='../../res/mock_image.jpg'
                                description='Overview'
                                rating={8.6}
                                voteCount={10}
                            />
                        </Route>
                    </MemoryRouter>
                </Provider>
            );
        })
    })
    
    it('renders movie card', () => {
        let tree : any = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})


describe('Unit test suite for movie cards', () => {

    let wrapper : any = null;

    beforeEach(() => {
        act(() => {
          wrapper = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Route path='/movie/:tconst' >
                    <MoviePage />
                    </Route>
                    <Route path='/' >
                        <MovieCard 
                            tconst='01'
                            title='Movie'
                            imageUrl='../../res/mock_image.jpg'
                            description='Overview'
                            rating={8.6}
                            voteCount={10}
                        />
                    </Route>
                </MemoryRouter>
            </Provider>
          )
        })
    })

  
    it('Test showing card data', async () => {
        // Test that title image media contains our title
        expect(wrapper.getByTestId('media').title.includes('Movie')).toBeTruthy()

        // Test that description shows correct data
        expect(wrapper.getByTestId('description').innerHTML.includes('Overview')).toBeTruthy()
    })
  
})