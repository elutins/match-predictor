from unittest import TestCase

from matchpredictor.app import app


class TestForecastApi(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.test_client = app.test_client()

    def test_forecast(self) -> None:
        response = self.test_client.get(
            '/forecast?home_name=Always+Wins&away_name=Always+Loses&league=italy+1'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {
            'fixture': {
                'away_team': {'name': 'Always Loses'},
                'home_team': {'name': 'Always Wins'},
                'league': 'italy 1'
            },
            'outcome': 'home',
            'confidence': 1
        })
