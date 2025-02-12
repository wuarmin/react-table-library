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

import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../../data';

storiesOf('Library Themes/Chakra UI', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        padding: 12px;

        border-radius: 12px;
        border: 1px solid #e2e8f0;
      `,
      BaseRow: `
        color: #4a5568;

        &:hover {
          color: #4a5568;
          cursor: default;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #e2e8f0;
        }
      `,
      HeaderRow: `
        text-transform: uppercase;
        font-size: 12px;
        height: 40px;

        font-weight: bold;

        border-bottom: 1px solid #e2e8f0;
      `,
      Row: `
        font-size: 16px;
        height: 53px;

        &:hover {
          backgorund-color: #fafafa;
        }
      `,
      BaseCell: `
        border-right: 1px solid transparent;
      `,
    });

    return (
      <Table data={data} theme={theme}>
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
                <Row item={item} key={item.id}>
                  {(tableItem) => (
                    <>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'en-US',
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
                    </>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
