/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { getData } from '../../server';

storiesOf('08. Server Recipes/ 04. Debounce', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: [],
    });

    // initial fetching

    const doGet = React.useCallback(async (params) => {
      setData(await getData(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    // features

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    const timeout = React.useRef();

    React.useEffect(() => {
      const params = {
        search,
      };

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => doGet(params), 500);
    }, [search]);

    return (
      <>
        <label htmlFor="search">
          Search by Task:
          <input id="search" type="text" onChange={handleSearch} />
        </label>

        <Table data={data}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Task</HeaderCell>
                  <HeaderCell>Deadline</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Complete</HeaderCell>
                  <HeaderCell>Tasks</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    {(tableItem) => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            }
                          )}
                        </Cell>
                        <Cell>{tableItem.type}</Cell>
                        <Cell>{tableItem.isComplete.toString()}</Cell>
                        <Cell>{tableItem.nodes?.length}</Cell>
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
