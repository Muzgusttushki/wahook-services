import {IsString} from 'class-validator';

export class AnalyticsObject {
    @IsString()
    google: string;
    @IsString()
    facebook: string;
    @IsString()
    yandex: string;
    @IsString()
    vis: string;
}
