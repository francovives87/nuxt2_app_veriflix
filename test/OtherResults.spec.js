import { shallowMount } from '@vue/test-utils';
import OtherResults from '@/components/OtherResults.vue';

describe('OtherResults', () => {
  it('renders correctly', () => {
    const otherResults = [
      {
        Title: 'Movie 1',
        Year: '2021',
        imdbID: '123456',
        Type: 'movie',
        Poster: 'movie1.jpg',
      },
      {
        Title: 'Movie 2',
        Year: '2022',
        imdbID: '789012',
        Type: 'movie',
        Poster: 'movie2.jpg',
      },
    ];

    const wrapper = shallowMount(OtherResults, {
      propsData: {
        otherResults,
      },
    });

    const cards = wrapper.findAll('.other-result-card');
    expect(cards).toHaveLength(otherResults.length);

    otherResults.forEach((result, index) => {
      const card = cards.at(index);
      expect(card.find('h5').text()).toBe(result.Title);
      expect(card.find('p').text()).toBe(result.Year);
    });
  });

  it('redirects to movie details', () => {
    const $router = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(OtherResults, {
      propsData: {
        otherResults: [
          {
            Title: 'Movie',
            Year: '2021',
            imdbID: '123456',
            Type: 'movie',
            Poster: 'movie.jpg',
          },
        ],
      },
      mocks: {
        $router,
      },
    });

    wrapper.find('button').trigger('click');
    expect($router.push).toHaveBeenCalledWith('/movie-details/123456');
  });
});
