import React from "react";
import { defaultProfile } from "../assets/assets";

function PostModel() {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md mx-auto max-w-[540px] w-full">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start">
              <div className="w-12 h-12 mr-3">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={defaultProfile}
                  alt="Profile"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">Software Engineer</p>
                <p className="text-xs text-gray-500">posted 10 minutes ago</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium hover:bg-blue-100 px-3 py-1 rounded transition duration-300">
              + Follow
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae ut sit explicabo sapiente, mollitia nulla eum quod
              expedita quis tenetur cumque a quasi repellat totam dolorum
              voluptatum iusto rerum veritatis reprehenderit, architecto fuga!
              Rem commodi aspernatur fugiat error eaque dignissimos, nostrum sit
              cumque reiciendis impedit vitae aliquid a vel alias autem in
              soluta molestias ab. Vitae eveniet laboriosam mollitia accusamus
              reiciendis fugit! Quos sapiente ipsam perferendis optio aut
              temporibus adipisci quae ullam necessitatibus? Minima voluptatum
              aspernatur consequatur ad labore rem nisi ea exercitationem
              dolorum quo repudiandae, pariatur vitae temporibus perspiciatis
              repellat laborum ratione voluptatem quidem est molestias hic
              magnam corrupti nesciunt ex? Perspiciatis, obcaecati. Laudantium
              adipisci vitae quis repellendus ut alias quae molestias. Quis
              beatae nesciunt vero fuga exercitationem temporibus suscipit nisi?
              Dolore neque placeat quibusdam saepe tenetur minus provident non
              id porro nulla iure, error nesciunt possimus veniam ipsam,
              assumenda illum quo consequuntur. Iste assumenda sit quia velit
              aspernatur dolores cumque quibusdam obcaecati minima quo
              reprehenderit libero voluptas consectetur animi deleniti minus,
              est sequi earum quisquam, dignissimos nobis incidunt ducimus
              exercitationem. Quos totam cupiditate ullam reprehenderit sequi
              fuga cumque. Vitae, ullam distinctio illo perferendis doloremque
              velit. Sed doloribus architecto ut itaque vero quasi repellat
              distinctio ducimus accusantium sequi, ipsa explicabo fugit aperiam
              aliquid provident cumque fuga fugiat illo in quis aliquam vel
              laudantium inventore? Sed vero deserunt ducimus ipsam. Non, quas
              exercitationem. Doloribus molestias officia neque animi ipsa nemo
              optio. Repudiandae odit ab, eaque voluptatem itaque maxime,
              dolorem possimus reiciendis eius recusandae sapiente, ipsa iste
              expedita fugiat obcaecati asperiores.
            </p>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <div>25 likes</div>
            <div>30 Comments</div>
          </div>
          <hr className="my-2 border-gray-200" />
          <div className="flex justify-around pt-2">
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded transition duration-300">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
              </svg>
              Like
            </button>
            <button className="flex items-center text-gray-600 hover:bg-gray-100 px-3 py-2 rounded transition duration-300">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModel;
