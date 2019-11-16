import { IsDefined, IsString, ValidateNested, IsUrl, IsNumber, IsObject } from 'class-validator'
import { Type } from 'class-transformer';
import { AnalyticsObject } from './analytics'

class OS {
    @IsString()
    name: String

    arch: String
}

class Browser {
    @IsString()
    name: String

    @IsString()
    version: String


}

class SheetObject {
    @ValidateNested()
    @IsDefined()
    @Type(() => AnalyticsObject)
    analytics: AnalyticsObject

    @ValidateNested()
    @IsDefined()
    @Type(() => OS)
    os: OS

    @ValidateNested()
    @IsDefined()
    @Type(() => Browser)
    browser: Browser

    @IsString()
    product: String

    @IsDefined()
    source: String
}

class Event {
    @IsDefined()
    @IsString()
    name: String

    @IsDefined()
    @IsString()
    date: String

    @IsDefined()
    @IsNumber()
    id: Number
}

class Utm {
    @IsString()
    source: String

    @IsObject({ each: true })
    tags: Object[]
}

class WidgetInitObject {
    @ValidateNested()
    @IsDefined()
    @Type(() => AnalyticsObject)
    analytics: AnalyticsObject

    @ValidateNested()
    @IsDefined()
    @Type(() => OS)
    os: OS

    @ValidateNested()
    @IsDefined()
    @Type(() => Browser)
    browser: Browser

    @IsString()
    product: String

    @ValidateNested()
    @Type(() => Utm)
    utm: Utm
}

class WidgetLazyObject {
    @IsDefined()
    @IsString()
    session: String

    @ValidateNested()
    @IsDefined()
    @Type(() => Event)
    event: Event
}

class WidgetSeatsObject {
    @IsDefined()
    @IsString()
    variant: String

    @IsDefined()
    @IsNumber()
    price: Number

    @IsDefined()
    @IsNumber()
    quantity: Number

    @IsDefined()
    @IsString()
    session: String
}

class WidgetOrder {
    @IsDefined()
    @IsString()
    session: String
}

class Ticket {
    @IsString()
    variant: String

    @IsNumber()
    price: Number

    @IsDefined()
    @IsNumber()
    quantity: Number

    discount: {
        type: String,
        value: Number
    }

    @IsString()
    tariff: String

    @IsString()
    promocode: String
}

class WidgetConfirmObject {
    @IsDefined()
    @IsString()
    session: String
    tickets: Ticket[]

    @IsNumber()
    orderId: Number

    @IsString()
    payment: String

    @IsDefined()
    @IsObject()
    buyer: {
        name: String,
        phone: String,
        email: String
    }
}

class WidgetPaymentObject {
    @IsString()
    @IsDefined()
    session: String
}

export {
    SheetObject,
    WidgetInitObject,
    WidgetLazyObject,
    WidgetSeatsObject,
    WidgetOrder,
    WidgetConfirmObject,
    WidgetPaymentObject
}