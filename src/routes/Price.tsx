import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts"
interface PriceProps {
    coinId: string
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
function Price({ coinId }: PriceProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000
    })

    return (
        <div>
            {isLoading ? "Loading chart..." : <ApexChart series={[
                // {
                //     name: "hello",
                //     data: [1, 2, 3],
                // },
                // {
                //     name: "sales",
                //     data: [10, 2, 35],
                // },
                {
                    name: "Price",
                    // data: data?.map((price) => price.close) ?? [],
                    data: data?.map((price) => parseFloat(price.close)) ?? []
                },
            ]} type="line" options={{
                theme: {
                    mode: 'dark',
                },
                chart: {
                    height: 500,
                    width: 500,
                }
            }} />}
        </div>
    )
}

export default Price