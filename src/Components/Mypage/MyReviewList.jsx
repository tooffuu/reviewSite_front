import React from "react";
import { LOCAL_URL } from "../../utils";

const MyReviewList = ({ index, comment }) => {
  const date = comment.createDate.split("T")[0];
  const name = comment.detail_name;
  const id = comment.detail_id;

  return (
    <>
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <th className="review_place_name">
            <p
              onClick={() => {
                window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
              }}
            >
              {name}
            </p>
          </th>
          <th className="comment">
            {comment?.content.length < 100
              ? comment.content
              : comment.content.slice(0, 30) + "..."}
          </th>
          <td>{date}</td>
          <td>{comment?.star}</td>
        </tr>
      </tbody>
    </>
  );
};

export default MyReviewList;
