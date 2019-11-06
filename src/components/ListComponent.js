import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {ADMIN_ROLE} from '../constants';

class ListComponent extends Component {


    renderAdminSection = (item) => {
      if (this.props.role === ADMIN_ROLE) {
        return (
          <span>
            <div className="btn-container">
              <button type="button" onClick={() => this.props.handleDelete(item)} className="btn btn-danger">Delete</button>
            </div>
            <div className="btn-container">
              <button type="button" onClick={() => this.props.handleEdit(item)} className="btn btn-success">Edit</button>
            </div>
          </span>
          );
      }
    }
    renderTableContent = (items) => {
      return (
        <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
              {
                items.map((item, i) => {
                  return (<tr key={i}>
                  <td>{item.name}</td>
                  <td>{this.renderAdminSection(item)}</td>
                </tr>)
                })
               }
              </tbody>
        </table>
        )
    }

    renderEmptyTable = () => {
      return (
        <div>No content</div>
      )
    }

  render() {
    const {items} = this.props;
      return (
        <div>
          {items ? this.renderTableContent(items) : this.renderEmptyTable() } 
        </div>
      );
  }
}

ListComponent.defaultProps = {
  handleDelete: () => {},
  handleEdit: () => {}
}

ListComponent.propTypes = {
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  role: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
}

export default ListComponent; 