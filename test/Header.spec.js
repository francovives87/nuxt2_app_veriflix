import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Header, {
      propsData: {
        firstResult: {
          Title: 'Example Title',
          Year: '2021',
          imdbID: '123456',
          Type: 'movie',
          Poster: 'example.jpg',
        },
      },
    });
    expect(wrapper.find('h1').text()).toBe('Example Title');
    expect(wrapper.find('p').text()).toBe('2021');
  });

  it('redirects to movie details', () => {
    const $router = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(Header, {
      propsData: {
        firstResult: {
          Title: 'Example Title',
          Year: '2021',
          imdbID: '123456',
          Type: 'movie',
          Poster: 'example.jpg',
        },
      },
      mocks: {
        $router,
      },
    });
    wrapper.find('button').trigger('click');
    expect($router.push).toHaveBeenCalledWith({ path: '/movie-details/123456' });
  });
});
