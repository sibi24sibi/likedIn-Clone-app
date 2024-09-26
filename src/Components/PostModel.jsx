import React from 'react'

function PostModel() {
  return (
    <>
      {/* className='post-model-container' */}
      <div>
        <div className='m-4'>
          {/* className='<profile-container' */}
          <div>
            {/* className='profile-details' */}
            <div>
              {/* className='profile-img' */}
              <div>
                <img src="" alt="" />
              </div>
              {/* className='profile-name' */}
              <div>
                <h3>John Doe</h3>
                <p>Software Engineer</p>
                <p>posted 10 minutes ago</p>
              </div>
            </div>
            <div>
              + Follow
            </div>
          </div>
          {/* className='post-content' */}
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          </div>
          {/* className="social-details" */}
          <div>
            {/* className="likes" */}
            <div></div>
            {/* className="comments" */}
            <div></div>
          </div>
          <hr />
          {/* className="social-action" */}
          <div>
            {/* className="likes" */}
            <div></div>
            {/* className="comments" */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostModel