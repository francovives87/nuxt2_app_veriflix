import { shallowMount, flushPromises } from '@vue/test-utils';
import Index from '@/pages/index.vue';

describe('Index', () => {
  it('fetches movies and sets firstResult and otherResults correctly', async () => {
    const searchResults = {
      Search: [
        {
          Title: 'Movie 1',
          Year: '2021',
          imdbID: '123456',
          Type: 'movie',
          Poster: 'poster1.jpg',
        },
        {
          Title: 'Movie 2',
          Year: '2022',
          imdbID: '789012',
          Type: 'movie',
          Poster: 'poster2.jpg',
        },
      ],
      totalResults: '2',
      Response: 'True',
    };

    jest.spyOn(window, 'axios').mockResolvedValue({ data: searchResults });

    const wrapper = shallowMount(Index);

    await flushPromises();

    expect(wrapper.vm.firstResult).toEqual(searchResults.Search[0]);
    expect(wrapper.vm.otherResults).toEqual(searchResults.Search.slice(1));

    window.axios.mockRestore();
  });

  it('increases currentPage and fetches more results on loadMoreResults click', async () => {
    const searchResults = {
      Search: [
        {
          Title: 'Movie 1',
          Year: '2021',
          imdbID: '123456',
          Type: 'movie',
          Poster: 'poster1.jpg',
        },
        {
          Title: 'Movie 2',
          Year: '2022',
          imdbID: '789012',
          Type: 'movie',
          Poster: 'poster2.jpg',
        },
      ],
      totalResults: '4',
      Response: 'True',
    };

    jest.spyOn(window, 'axios').mockResolvedValue({ data: searchResults });

    const wrapper = shallowMount(Index);

    await flushPromises();

    expect(wrapper.vm.currentPage).toBe(1);

    wrapper.find('.loadMore').trigger('click');

    expect(wrapper.vm.currentPage).toBe(2);

    await flushPromises();

    expect(wrapper.vm.otherResults).toEqual([...searchResults.Search, ...searchResults.Search]);

    window.axios.mockRestore();
  });

  it('scrolls to top when toTop button is clicked', async () => {
    const wrapper = shallowMount(Index);

    window.scrollTo = jest.fn();

    wrapper.find('.scroll-top').trigger('click');

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
