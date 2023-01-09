import { useQuery } from 'react-query'
import { fetchCoinHistory } from '../api'
import ApexChart from "react-apexcharts"
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

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
interface CharProps {
    coinId: string

}


function Chart({ coinId }: CharProps) {
    // const { coinId } = useParams<ParamsInterface>()
    const isDark = useRecoilValue(isDarkAtom)
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000
    })
    console.log(data)
    const exceptData = data ?? []
    const chartData = exceptData?.map((i) => {
        return {
            x: i.time_close,
            y: [i.open, i.high, i.low, i.close]
        }
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
                    // data: data?.map((price) => parseFloat(price.close)) ?? []
                    data: chartData
                },
            ]} type="candlestick" options={{
                theme: {
                    mode: isDark ? "dark" : "light",
                },
                chart: {
                    height: 500,
                    width: 500,
                }
            }} />}
        </div>
    )
}

export default Chart