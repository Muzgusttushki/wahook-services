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
    @Type(() => AnalyticsObject)
    analytics: AnalyticsObject;

    @ValidateNested()
    @Type(() => OS)
    os: OS;

    @ValidateNested()
    @Type(() => Browser)
    browser: Browser;

    @IsString()
    vis: string;

    @IsString()
    product: string;

    source: string;
    utm: object;
}

class Event {
    @IsString()
    name: String

    @IsString()
    date: String

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
    @Type(() => AnalyticsObject)
    analytics: AnalyticsObject

    @ValidateNested()
    @Type(() => OS)
    os: OS

    @ValidateNested()
    @Type(() => Browser)
    browser: Browser

    @IsString()
    product: String

    @ValidateNested()
    @Type(() => Utm)
    utm: Utm

    @IsString()
    url: String
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
    @IsString()
    variant: String

    @IsNumber()
    price: Number

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
