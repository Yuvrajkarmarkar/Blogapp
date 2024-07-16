import{BrowserRouter,Router,Route} from 'react-router-dom'

export default function about() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className='text-4xl font-bold text-center my-7'>About Yuvraj's blog</h1>
          <div className="text-md flex flex-col gap-4">
            <p>
              Yuvraj is a software engineer, passionate about technology, and aspiring to build innovative solutions. He has a strong background in programming languages such as JavaScript, Python, and Java. He is also a fitness enthusiast and loves exploring new hobbies and interests. He is currently working remotely and focusing on his career.
            </p>
            <p>
              Yuvraj has a diverse background and has worked in various companies, including tech startups, corporate, and government. He has a strong work ethic, a strong attention to detail, and a knack for problem-solving. He is a dedicated and hardworking individual who loves to learn and grow.
            </p>
            <p>
              Yuvraj is currently available for freelance opportunities, and he is always looking for new projects to work on. He is eager to learn new technologies and work on interesting projects with a diverse team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
