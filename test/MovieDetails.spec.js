import { shallowMount } from '@vue/test-utils';
import MovieDetails from '@/pages/movie-details/index.vue';

describe('MovieDetails', () => {
  it('renders movie details correctly', () => {
    const movieData = {
      Title: 'Movie Title',
      Year: '2021',
      Rated: 'PG-13',
      Released: '2021-01-01',
      Runtime: '120 min',
      Genre: 'Action',
      Director: 'John Doe',
      Writer: 'Jane Smith',
      Actors: 'Actor 1, Actor 2',
      Plot: 'Movie plot',
      Language: 'English',
      Country: 'USA',
      Awards: 'Some awards',
      Poster: 'movie.jpg',
      Ratings: [
        { Source: 'IMDb', Value: '7.5/10' },
        { Source: 'Rotten Tomatoes', Value: '85%' },
      ],
      Metascore: '75',
      imdbRating: '7.5',
      imdbVotes: '1000',
      imdbID: '123456',
      Type: 'movie',
      DVD: '2021-02-01',
      BoxOffice: '1000000',
      Production: 'Movie Production',
      Website: 'https://example.com',
      Response: 'True',
    };

    const wrapper = shallowMount(MovieDetails, {
      data() {
        return {
          movieData,
        };
      },
    });

    expect(wrapper.find('h1.card-title').text()).toBe(movieData.Title);
    expect(wrapper.find('p.card-text').text()).toBe(movieData.Year);
    expect(wrapper.find('p.card-text:nth-of-type(2)').text()).toContain(movieData.Director);
    expect(wrapper.find('p.card-text:nth-of-type(3)').text()).toContain(movieData.Actors);
    expect(wrapper.find('p.card-text:nth-of-type(4)').text()).toContain(movieData.Genre);
    expect(wrapper.find('p.card-text:nth-of-type(5)').text()).toContain(movieData.Country);
    expect(wrapper.find('.description-card p').text()).toBe(movieData.Plot);

    const ratings = wrapper.findAll('.description-card li');
    expect(ratings).toHaveLength(movieData.Ratings.length);

    movieData.Ratings.forEach((rating, index) => {
      const ratingElement = ratings.at(index);
      expect(ratingElement.find('strong').text()).toBe(rating.Source);
      expect(ratingElement.text()).toContain(rating.Value);
    });
  });

  it('does not render movie details if movieData is null', () => {
    const wrapper = shallowMount(MovieDetails, {
      data() {
        return {
          movieData: null,
        };
      },
    });

    expect(wrapper.find('.container').exists()).toBe(false);
  });

  it('fetches movie data and sets movieData on mount', async () => {
    const imdbID = '123456';
    const movieData = {
      Title: 'Movie Title',
      Year: '2021',
      // Rest of the movie data...
    };

    jest.spyOn(window, 'axios').mockResolvedValue({ data: movieData });

    const wrapper = shallowMount(MovieDetails, {
      mocks: {
        $route: {
          params: {
            imdbID,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.movieData).toBe(movieData);
    expect(wrapper.find('h1.card-title').text()).toBe(movieData.Title);
    expect(wrapper.find('p.card-text').text()).toBe(movieData.Year);

    window.axios.mockRestore();
  });

  it('logs an error if API call fails', async () => {
    const imdbID = '123456';

    jest.spyOn(window, 'axios').mockRejectedValue(new Error('API error'));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = shallowMount(MovieDetails, {
      mocks: {
        $route: {
          params: {
            imdbID,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.movieData).toBeNull();
    expect(console.error).toHaveBeenCalled();

    window.axios.mockRestore();
    console.error.mockRestore();
  });
});
