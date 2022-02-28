import {render} from '@testing-library/react';
import {TestAppContext} from '../../testSupport/TestAppContext';
import TeamSelector from '../TeamSelector';
import {Store} from 'redux';
import {AppState, stateStore} from '../../App/StateStore';
import {teamsState} from '../TeamsState';
import {result} from '../../Http/Result';
import userEvent from '@testing-library/user-event';

describe('TeamSelector', () => {
    let store: Store<AppState>;

    beforeEach(() => {
        store = stateStore.create();

        store.dispatch(teamsState.finishedLoading(result.ok([
            {name: 'Chelsea', country: 'england'},
            {name: 'Roma', country: 'italy'},
        ])));
    });

    test('filter', () => {
        const page = render(<TestAppContext store={store}>
            <TeamSelector side="home"/>
        </TestAppContext>);

        expect(page.queryByRole('option', {name: 'Chelsea'})).toBeNull();
        expect(page.queryByRole('option', {name: 'Roma'})).toBeNull();

        userEvent.selectOptions(page.getByLabelText('country'), 'england');
        expect(page.queryByRole('option', {name: 'Chelsea'})).toBeVisible();
        expect(page.queryByRole('option', {name: 'Roma'})).toBeNull();

        userEvent.selectOptions(page.getByLabelText('country'), 'italy');
        expect(page.queryByRole('option', {name: 'Chelsea'})).toBeNull();
        expect(page.queryByRole('option', {name: 'Roma'})).toBeVisible();
    });

    test('pick home', () => {
        const page = render(<TestAppContext store={store}>
            <TeamSelector side="home"/>
        </TestAppContext>);

        userEvent.selectOptions(page.getByLabelText('country'), 'england');
        userEvent.selectOptions(page.getByLabelText('name'), 'Chelsea');

        expect(store.getState().fixture.home).toEqual({name: 'Chelsea', country: 'england'});
    });

    test('pick away', () => {
        const page = render(<TestAppContext store={store}>
            <TeamSelector side="away"/>
        </TestAppContext>);

        userEvent.selectOptions(page.getByLabelText('country'), 'italy');
        userEvent.selectOptions(page.getByLabelText('name'), 'Roma');

        expect(store.getState().fixture.away).toEqual({name: 'Roma', country: 'italy'});
    });
});
