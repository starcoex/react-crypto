import {
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from 'react-router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';

const Container = styled.div`
	padding: 0 20px;
	max-width: 480px;
	margin: 0 auto;
`;
const Header = styled.header`
	display: flex;
	height: 10vh;
	justify-content: center;
	align-items: center;
`;
const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 48px;
`;
const Loader = styled.div`
	font-weight: 400;
	font-size: 32px;
	display: block;
	text-align: center;
`;
const Overview = styled.div`
	display: flex;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 33%;
	span:first-child {
		font-size: 12px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 20px;
`;
const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
`;
const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 8px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;
const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 1rem;
	right: 1rem;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: none;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.accentColor};
	font-size: 0.4rem;
`;

interface RouteParams {
	coinId: string;
}

interface LinkParams {
	name: string;
}
interface ITag {
	coin_counter: number;
	ico_counter: number;
	id: string;
	name: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	tags: ITag[];
	// team: object;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	// links: object;
	// links_extended: object;
	// whitepaper: object;
	first_data_at: string;
	last_data_at: string;
}
interface PriceDate {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
		rank: number;
		symbol: string;
		total_supply: number;
	};
}
interface ICoinProps {}

function Coin() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<LinkParams>();
	const priceMatch = useRouteMatch('/:coinId/price');
	const chartMatch = useRouteMatch('/:coinId/chart');
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		['info', coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceDate>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 5000,
		}
	);
	const loading = infoLoading || tickersLoading;

	return (
		<Container>
			<Helmet>
				<title>
					{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>
					{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
				</Title>
				<Link to='/'>
					<Button>Home</Button>
				</Link>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>

					<Overview>
						<OverviewItem>
							<span>Total Supply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
