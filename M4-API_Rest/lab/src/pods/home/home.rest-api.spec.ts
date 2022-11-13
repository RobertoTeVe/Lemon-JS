import supertest from 'supertest';
import { createRestApiServer } from 'core/servers';
import { houseApi, listApi } from './home.rest-api';
import { mapHomeListFromModelToApi } from './home.mappers';

const app = createRestApiServer();
app.use(listApi);

describe('src/pods/home/home.rest-api specs', () => {
    describe('getHomeList', () => {
        it('All homes by requesting just /',
            async () => {
                // Arrange
                const route = '/'
                // Act
                const response = await supertest(app).get(route);
                let body = Object.keys(response.body).length;
                // Assert
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual(6);
            })
            it('Germany homes by requesting /Germany',
                async () => {
                    // Arrange
                    const route = '/Germany'
                    // Act
    
                    const response = await supertest(app).get(route);
                    let body = Object.keys(response.body).length;
                    // Assert
                    expect(response.statusCode).toEqual(200);
                    expect(body).toEqual(2);
                })
            it('Returns no homes if country not found /PepiLand',
                async () => {
                    // Arrange
                    const route = '/PepiLand'
                    // Act
    
                    const response = await supertest(app).get(route);
                    let body = Object.keys(response.body).length;
                    // Assert
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual({});
                })
        })
})