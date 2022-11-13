// TODO: Implementar el describe()it() del mapper. min 2:31:29 vid 08
import * as model from 'dals';
import { HomeBasic } from 'dals';
import * as apiModel from './home.api-model';
import {
    mapHomeListFromModelToApi,
    mapHomeInListFromApiToModel
} from './home.mappers'

describe('src/pods/home/mappers', () => {
    describe('mapHomeListFromApiToModel', () => {
        // Se puede tipar parametro de entrada y salida <[apiModel.Home[],model.Home[]]>
        it.each<apiModel.Home[]>([undefined, null, []])('Output empty array when %p is the input',
            (homeList: any) => {
                // Arrange
                // Act
                const result = mapHomeListFromModelToApi(homeList);
                // Assert   
                expect(result).toEqual([]);
            })
        it('Passes when input proper array', () => {
            // Arrange
            const home: apiModel.HomeBasic = {
                id: '145152',
                name: 'Pepep pepepe',
                images: {
                    picture_url: 'http.eadha.es/asdjafja'
                }
            }
            // Act
            const result = mapHomeInListFromApiToModel(home);
            // Assert   
            expect(result).toEqual({
                _id: '145152',
                name: 'Pepep pepepe',
                images: {
                    picture_url: 'http.eadha.es/asdjafja'
                }
            });
        });
    })
});
