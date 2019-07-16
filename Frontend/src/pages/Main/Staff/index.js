import React from "react";
import "./index.css";

const index = () => {
  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr className="ColTitle">
              <td style={{ width: "150px" }}>사업시작연도</td>
              <td style={{ width: "350px" }}>참여사업</td>
              <td style={{ width: "350px" }}>참여 세부사업</td>
              <td style={{ width: "150px" }}>검색어</td>
              <td rowSpan="2">
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  검색
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
                  >
                    Dropdown
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div role="separator" class="dropdown-divider" />
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
                  >
                    Dropdown
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div role="separator" class="dropdown-divider" />
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
                  >
                    Dropdown
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div role="separator" class="dropdown-divider" />
                    <a class="dropdown-item" href="#">
                      Separated link
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
