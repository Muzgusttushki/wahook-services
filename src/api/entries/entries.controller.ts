import { Controller, Post, Body, Req } from '@nestjs/common';
import { SheetObject, WidgetInitObject, WidgetLazyObject, WidgetSeatsObject, WidgetOrder, WidgetConfirmObject, WidgetPaymentObject } from './schemas/sheet.schema';
import { Request } from 'express';
import { EntriesService } from './entries.service';
import { LoggerService } from '../../utils/logger';
import { IResult } from './schemas/result';

@Controller('entries')
export class EntriesController {
    private readonly logger: LoggerService = new LoggerService();
    constructor(private readonly entriesService: EntriesService) { }

    /**
     *
     * @param sheet {SheetObject}
     * @param request {Request}
     * @description
     * Посещения пользовтеля
     */
    @Post('analysis.sheet')
    async sheet(@Body() sheet: SheetObject, @Req() request: Request): Promise<IResult> {
        const source = request.headers.origin as string;
        const address = (request.headers['x-real-ip'] || request.connection.remoteAddress) as string;

        return await this.entriesService.sheet(sheet,
            address,
            source).then(() => {
                return {
                    then: {
                        message: 'OK',
                        address,
                        source,
                    },
                };
            }).catch(resolve => {
                this.logger.error(resolve);

                return {
                    error: {
                        message: 'ERROR WRITE ANALYSIS PAGE',
                    },
                };
            });
    }

    @Post('analysis/widget.open')
    async open(@Body() sheet: WidgetInitObject, @Req() request: Request) {
        const source = request.headers.origin as string,
            address = (request.headers['x-real-ip'] || request.connection.remoteAddress) as string;

        return await this.entriesService.widgetOpen(sheet, source, address).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.lazy')
    async lazy(@Body() sheet: WidgetLazyObject) {
        return await this.entriesService.widgetLazy(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.seat')
    async seat(@Body() sheet: WidgetSeatsObject) {
        return await this.entriesService.widgetSeat(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.unseat')
    async unseat(@Body() sheet: WidgetSeatsObject) {
        return await this.entriesService.widgetUnSeat(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.order')
    async order(@Body() sheet: WidgetOrder) {
        return await this.entriesService.widgetOrder(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.confirm')
    async confirm(@Body() sheet: WidgetConfirmObject) {
        return await this.entriesService.widgetConfirm(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }

    @Post('analysis/widget.payment')
    async payment(@Body() sheet: WidgetPaymentObject) {
        return await this.entriesService.widgetPayment(sheet).catch(resolve => {
            this.logger.error(resolve);
            return null;
        });
    }
}
