import { IsString, IsDefined } from "class-validator"

class AnalyticsObject {
    @IsString()
    google: String

    @IsString()
    facebook: String

    @IsString()
    yandex: String
}

export { AnalyticsObject }