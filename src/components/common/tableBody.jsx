import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell(item, col) {
    if (col.content) return col.content(item);
    return _.get(item, col.path);
  }

  generateKey(item, col) {
    return item._id + (col.path || col.key);
  }

  render() {
    const { columns, data } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((col) => (
              <td key={this.generateKey(item, col)}>
                {this.renderCell(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
