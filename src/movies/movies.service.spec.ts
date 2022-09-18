import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('create a moive', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('sholud return a movie', () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update()', () => {
    it('update a movie', () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });

      service.update(1, {
        title: 'Update Movie',
      });
      const movie = service.getOne(1);

      expect(movie.title).toEqual('Update Movie');
    });

    it('sholud return a 404', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it('sholud return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
