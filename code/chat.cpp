#include <fstream>
#include <iostream>
#include <iomanip>
#include <ctime>
#include <boost/interprocess/sync/file_lock.hpp>

using namespace std;

int main(){
  cout << "Content-type: text/plain\n\n";
  string str;
  ofstream ofs;
  for(int i=0;i<3;i++){
    ofs.open("chat.csv", ios::app);
    if(ofs) break;
    sleep(1);
    if(i==2){
      cout << "error" << endl;
      return -1;
    }
  }

  try{
    //file_lock
    boost::interprocess::file_lock flock("chat.csv");

    flock.lock();

    //write
    time_t timer;
    struct tm *t;
    time(&timer);
    t = localtime(&timer);
    getline(cin, str);
    ofs << setw(2)<<setfill('0') << t->tm_hour << ":" << setw(2)<<setfill('0') << t->tm_min << ":" << setw(2)<<setfill('0') << t->tm_sec << "," << str << endl;

  }catch(exception& e){
    cout << e.what() << endl;
  }

  return 0;
}
