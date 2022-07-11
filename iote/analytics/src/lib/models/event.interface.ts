export interface TrackEvent {
    name: string;
    function?: string;
    componentName?: string;
    service?: string,
    success?: boolean;
    accType?: string;
    info?: { description?: string, data?: any };
} 