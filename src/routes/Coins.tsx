import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';

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
const CoinsList = styled.ul``;
const Coin = styled.li`
	background-color: white;
	margin-bottom: 10px;
	border-radius: 10px;
	a {
		transition: color 0.2s ease-in-out;
		display: flex;
		align-items: center;
		padding: 20px;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
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
const Img = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 15px;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}
interface ICoinsProps {

}
function Coins() {
	const { isLoading, data } = useQuery<CoinInterface[]>(
		'allCoins',
		fetchCoins
	);
	const setDartAtom = useSetRecoilState(isDarkAtom)
	const toggleDartAtom = () => setDartAtom((prev) => !prev)
	return (
		<Container>
			<Helmet>
				<title>
					Coin
				</title>
			</Helmet>
			<Header>
				<Title>Coin</Title>
				<button onClick={toggleDartAtom}>Toggle Mode</button>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}>
								<Img
									src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
									alt=''
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
